import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  Typography, 
  TextField, 
  FormControl, 
  FormLabel, 
  RadioGroup, 
  FormControlLabel, 
  Radio, 
  Divider, 
  Container, 
  Grid, 
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Chip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  saveShippingAddress, 
  savePaymentMethod,
  loadCart 
} from '../store/slice/cartSlice';

const steps = ['Shipping', 'Payment', 'Review & Place Order'];

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledStepContent = styled(StepContent)(({ theme }) => ({
  padding: theme.spacing(2, 0, 2, 5),
  borderLeft: `1px solid ${theme.palette.divider}`,
}));

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    // Load cart from localStorage
    dispatch(loadCart());
    
    // If cart is empty, redirect to cart
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [dispatch, items.length, navigate]);

  const handleNext = () => {
    if (activeStep === 0) {
      // Save shipping address
      dispatch(saveShippingAddress(shippingInfo));
    } else if (activeStep === 1) {
      // Save payment method
      dispatch(savePaymentMethod(paymentMethod));
    } else if (activeStep === 2) {
      // Place order
      handlePlaceOrder();
      return;
    }
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo({
      ...shippingInfo,
      [name]: value,
    });
  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handlePlaceOrder = async () => {
    setIsProcessing(true);
    try {
      // Here you would typically make an API call to place the order
      // const response = await placeOrderApiCall({ items, shippingAddress, paymentMethod });
      
      // For now, we'll simulate a successful order
      setTimeout(() => {
        setIsProcessing(false);
        navigate('/order-success');
        // Clear cart after successful order
        // dispatch(clearCart());
      }, 1500);
    } catch (error) {
      console.error('Error placing order:', error);
      setIsProcessing(false);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box component="form" noValidate autoComplete="off">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  name="address"
                  label="Address"
                  value={shippingInfo.address}
                  onChange={handleShippingChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  name="city"
                  label="City"
                  value={shippingInfo.city}
                  onChange={handleShippingChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="postalCode"
                  name="postalCode"
                  label="Postal Code"
                  value={shippingInfo.postalCode}
                  onChange={handleShippingChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  name="country"
                  label="Country"
                  value={shippingInfo.country}
                  onChange={handleShippingChange}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 1:
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Payment Method</FormLabel>
            <RadioGroup
              aria-label="payment-method"
              name="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
            >
              <FormControlLabel 
                value="credit_card" 
                control={<Radio />} 
                label="Credit/Debit Card" 
              />
              <FormControlLabel 
                value="paypal" 
                control={<Radio />} 
                label="PayPal" 
              />
              <FormControlLabel 
                value="cash_on_delivery" 
                control={<Radio />} 
                label="Cash on Delivery" 
              />
            </RadioGroup>
          </FormControl>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemText
                    primary={item.pizza.name}
                    secondary={
                      <>
                        <Box component="span" display="block">
                          Quantity: {item.quantity}
                        </Box>
                        {item.toppings.length > 0 && (
                          <Box component="span" display="block" mt={1}>
                            {item.toppings.map((topping, idx) => (
                              <Chip 
                                key={idx}
                                label={topping.name}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                              />
                            ))}
                          </Box>
                        )}
                      </>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="subtitle1">
                      ${(item.pizza.price * item.quantity).toFixed(2)}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Subtotal</Typography>
              <Typography>${totalAmount.toFixed(2)}</Typography>
            </Box>
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography>Delivery Fee</Typography>
              <Typography>$2.99</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Box display="flex" justifyContent="space-between" mb={2}>
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">
                ${(totalAmount + 2.99).toFixed(2)}
              </Typography>
            </Box>
            
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography>
                {shippingInfo.address}<br />
                {shippingInfo.city}, {shippingInfo.postalCode}<br />
                {shippingInfo.country}
              </Typography>
            </Box>
            
            <Box mt={4}>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography>
                {paymentMethod === 'credit_card' && 'Credit/Debit Card'}
                {paymentMethod === 'paypal' && 'PayPal'}
                {paymentMethod === 'cash_on_delivery' && 'Cash on Delivery'}
              </Typography>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StyledStepContent>
              {renderStepContent(index)}
              <Box sx={{ mt: 2 }}>
                <Button
                  disabled={activeStep === 0}
                  onClick={handleBack}
                  sx={{ mr: 1 }}
                >
                  Back
                </Button>
                <Button
                  variant="contained"
                  onClick={handleNext}
                  disabled={
                    (activeStep === 0 && !shippingInfo.address) ||
                    isProcessing
                  }
                >
                  {activeStep === steps.length - 1 
                    ? isProcessing ? 'Placing Order...' : 'Place Order'
                    : 'Next'}
                </Button>
              </Box>
            </StyledStepContent>
          </Step>
        ))}
      </Stepper>
      
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
        </Paper>
      )}
    </Container>
  );
};

export default Checkout;
