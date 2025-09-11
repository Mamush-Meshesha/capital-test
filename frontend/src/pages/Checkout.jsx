import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Stepper,
  Step,
  StepLabel,
  Box,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Paper,
  Grid,
  Alert,
} from "@mui/material";
import {
  saveShippingAddress,
  savePaymentMethod,
} from "../store/slice/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import api from "../utils/api";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || ""
);

const steps = ["Shipping", "Payment", "Review & Place Order"];

const PaymentStep = ({
  amount,
  onSucceeded,
  onOrderCreated,
  onPaymentProcessed,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setLoading(true);
    setError("");
    try {
      // Create payment intent on backend
      const intentRes = await api.post("/api/payments/create-intent", {
        amount,
        currency: "usd",
      });
      const clientSecret =
        intentRes.data?.clientSecret || intentRes.data?.client_secret;
      if (!clientSecret) {
        throw new Error("Payment intent not created");
      }

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed");
      } else if (
        result.paymentIntent &&
        result.paymentIntent.status === "succeeded"
      ) {
        // Create order after successful payment
        if (onOrderCreated) {
          await onOrderCreated(result.paymentIntent);
        }
        // Mark payment as processed
        if (onPaymentProcessed) {
          onPaymentProcessed();
        }
        onSucceeded(result.paymentIntent);
      } else {
        setError("Payment not completed");
      }
    } catch (e) {
      setError(e?.response?.data?.message || e.message || "Payment error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 2 }}>
        <CardElement options={{ hidePostalCode: true }} />
      </Box>
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handlePay}
        disabled={!stripe || loading}
      >
        {loading ? "Processing..." : `Pay $${(amount / 100).toFixed(2)}`}
      </Button>
    </Box>
  );
};

const CheckoutInner = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingForm, setShippingForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [error, setError] = useState("");
  const [orderCreated, setOrderCreated] = useState(false);
  const [paymentProcessed, setPaymentProcessed] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state?.auth || {});

  const totalCents = Math.round(
    items.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0) * 100
  );

  useEffect(() => {
    if (!items || items.length === 0) navigate("/cart");
  }, [items, navigate]);

  const createOrder = async (paymentIntent) => {
    try {
      if (!user?.id) {
        throw new Error("User not authenticated");
      }

      // Prepare order items for backend
      const orderItems = items.map((item) => ({
        menuId: item.pizza.id,
        quantity: item.quantity,
        toppings: item.toppings || [],
      }));

      // Create order in backend
      const orderData = {
        customerId: user.id,
        restaurantId: 1, // Default restaurant ID - you might want to make this dynamic
        items: orderItems,
        totalAmount: totalCents,
        paymentIntentId: paymentIntent.id,
      };

      const response = await api.post("/api/orders", orderData);

      if (response.data?.success) {
        setOrderCreated(true);
        return response.data.order;
      } else {
        throw new Error(response.data?.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      throw error;
    }
  };

  const handleNext = async () => {
    setError("");
    if (activeStep === 0) {
      if (
        !shippingForm.firstName ||
        !shippingForm.lastName ||
        !shippingForm.address ||
        !shippingForm.city ||
        !shippingForm.postalCode ||
        !shippingForm.country
      ) {
        setError("Please fill in all shipping details");
        return;
      }
      dispatch(saveShippingAddress(shippingForm));
      setActiveStep((s) => s + 1);
      return;
    }
    if (activeStep === 1) {
      dispatch(savePaymentMethod(paymentMethod));
      // For card payment, don't advance until payment is processed
      if (paymentMethod === "card") {
        if (!paymentProcessed) {
          setError("Please complete the payment first");
          return;
        }
      }
      setActiveStep((s) => s + 1);
      return;
    }
    if (activeStep === 2) {
      // For cash on delivery, create order now
      if (paymentMethod === "cash_on_delivery") {
        try {
          setError("");
          // Create a mock payment intent for cash on delivery
          const mockPaymentIntent = {
            id: `cash_${Date.now()}`,
            status: "succeeded",
          };
          await createOrder(mockPaymentIntent);
          navigate("/order-success");
        } catch (error) {
          setError(error.message || "Failed to create order");
        }
      } else {
        // For card payment, order should already be created in PaymentStep
        navigate("/order-success");
      }
      return;
    }
  };

  const handleBack = () => setActiveStep((s) => s - 1);

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingForm((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
    setPaymentProcessed(false); // Reset payment status when method changes
    setError(""); // Clear any errors
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" noValidate sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={shippingForm.firstName}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={shippingForm.lastName}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Address"
                  name="address"
                  value={shippingForm.address}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="City"
                  name="city"
                  value={shippingForm.city}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={shippingForm.postalCode}
                  onChange={handleShippingChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  label="Country"
                  name="country"
                  value={shippingForm.country}
                  onChange={handleShippingChange}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <Box sx={{ mt: 3 }}>
            <FormControl component="fieldset" sx={{ width: "100%" }}>
              <FormLabel component="legend">Select Payment Method</FormLabel>
              <RadioGroup
                name="paymentMethod"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
                <FormControlLabel
                  value="card"
                  control={<Radio />}
                  label="Credit/Debit Card"
                />
                <FormControlLabel
                  value="cash_on_delivery"
                  control={<Radio />}
                  label="Cash on Delivery"
                />
              </RadioGroup>
            </FormControl>
            {paymentMethod === "card" && (
              <PaymentStep
                amount={totalCents}
                onSucceeded={() => setActiveStep((s) => s + 1)}
                onOrderCreated={createOrder}
                onPaymentProcessed={() => setPaymentProcessed(true)}
              />
            )}
          </Box>
        );
      case 2:
        return (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            {items.map((item, idx) => (
              <Box key={`${item.pizza.id}-${idx}`} mb={2}>
                <Box display="flex" justifyContent="space-between">
                  <Typography>
                    {item.pizza.name} x {item.quantity}
                  </Typography>
                  <Typography>
                    {(item.pizza.price * item.quantity).toFixed(2)} Birr
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>

      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        {renderStepContent(activeStep)}
      </Paper>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={
            activeStep === 1 && paymentMethod === "card" && !paymentProcessed
          }
        >
          {activeStep === steps.length - 1 ? "Place Order" : "Next"}
        </Button>
      </Box>
    </Container>
  );
};

const Checkout = () => (
  <Elements stripe={stripePromise}>
    <CheckoutInner />
  </Elements>
);

export default Checkout;
