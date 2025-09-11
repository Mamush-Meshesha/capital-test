import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
  Grid
} from '@mui/material';
import { clearCart } from '../cart/cartSlice';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';

const OrderSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, shippingAddress, paymentMethod } = useSelector(state => state.cart);
  
  // Clear cart when component mounts
  useEffect(() => {
    return () => {
      dispatch(clearCart());
    };
  }, [dispatch]);

  // Redirect to home if cart is empty (page refresh scenario)
  useEffect(() => {
    if (items.length === 0) {
      navigate('/');
    }
  }, [items, navigate]);

  if (items.length === 0) {
    return null; // Will redirect in useEffect
  }

  const totalPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const orderNumber = `#${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
        <CheckCircleIcon 
          color="success" 
          sx={{ fontSize: 80, mb: 2 }}
        />
        
        <Typography variant="h4" gutterBottom>
          Thank you for your order!
        </Typography>
        
        <Typography variant="subtitle1" color="textSecondary" paragraph>
          Your order has been placed successfully.
        </Typography>
        
        <Typography variant="h6" sx={{ mt: 3, mb: 2 }}>
          Order #{orderNumber}
        </Typography>
        
        <Divider sx={{ my: 3 }} />
        
        <Grid container spacing={4} sx={{ mt: 2, textAlign: 'left' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Order Summary
            </Typography>
            <List>
              {items.map((item) => (
                <ListItem key={item.id} disablePadding sx={{ py: 1 }}>
                  <ListItemText 
                    primary={`${item.name} x ${item.quantity}`}
                    secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                  />
                </ListItem>
              ))}
              <Divider sx={{ my: 1 }} />
              <ListItem disablePadding sx={{ py: 1, fontWeight: 'bold' }}>
                <ListItemText primary="Total" />
                <Typography>${totalPrice.toFixed(2)}</Typography>
              </ListItem>
            </List>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Box mb={3}>
              <Typography variant="h6" gutterBottom>
                Shipping Address
              </Typography>
              <Typography>
                {shippingAddress.firstName} {shippingAddress.lastName}
                <br />
                {shippingAddress.address}
                <br />
                {shippingAddress.city}, {shippingAddress.postalCode}
                <br />
                {shippingAddress.country}
              </Typography>
            </Box>
            
            <Box>
              <Typography variant="h6" gutterBottom>
                Payment Method
              </Typography>
              <Typography>
                {paymentMethod === 'credit_card' && 'Credit Card'}
                {paymentMethod === 'paypal' && 'PayPal'}
                {paymentMethod === 'cash_on_delivery' && 'Cash on Delivery'}
              </Typography>
            </Box>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => navigate('/')}
            size="large"
          >
            Continue Shopping
          </Button>
          <Button 
            variant="outlined"
            onClick={() => navigate('/orders')}
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
