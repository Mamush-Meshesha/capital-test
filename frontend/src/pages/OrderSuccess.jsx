import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  Grid,
} from "@mui/material";
import { clearCart } from "../store/slice/cartSlice";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, shippingAddress, paymentMethod } = useSelector(
    (state) => state.cart
  );

  // Clear cart when leaving the page, not before rendering it
  useEffect(() => {
    return () => {
      dispatch(clearCart());
    };
  }, [dispatch]);

  const totalPrice =
    items?.reduce((acc, item) => acc + item.pizza.price * item.quantity, 0) ||
    0;
  const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80, mb: 2 }} />

        <Typography variant="h4" gutterBottom>
          Thank you for your order!
        </Typography>
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Your order has been placed successfully.
        </Typography>

        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Order {orderNumber}
        </Typography>
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={4} sx={{ mt: 2, textAlign: "left" }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {items?.map((item, idx) => (
                <ListItem
                  key={`${item.pizza.id}-${idx}`}
                  disablePadding
                  sx={{ py: 1 }}
                >
                  <ListItemText
                    primary={`${item.pizza.name} x ${item.quantity}`}
                    secondary={`${(item.pizza.price * item.quantity).toFixed(
                      2
                    )} Birr`}
                  />
                </ListItem>
              ))}
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding sx={{ py: 1, fontWeight: "bold" }}>
                <ListItemText primary="Total" />
                <Typography>{totalPrice.toFixed(2)} Birr</Typography>
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography>
                {shippingAddress?.firstName} {shippingAddress?.lastName}
                <br />
                {shippingAddress?.address}
                <br />
                {shippingAddress?.city}, {shippingAddress?.postalCode}
                <br />
                {shippingAddress?.country}
              </Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography>
                {paymentMethod === "credit_card" || paymentMethod === "card"
                  ? "Credit/Debit Card"
                  : paymentMethod === "paypal"
                  ? "PayPal"
                  : paymentMethod === "cash_on_delivery"
                  ? "Cash on Delivery"
                  : ""}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "center", gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/")}
            size="large"
          >
            Continue Shopping
          </Button>
          <Button
            variant="outlined"
            onClick={() => navigate("/orders")}
            size="large"
          >
            View Orders
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default OrderSuccess;
