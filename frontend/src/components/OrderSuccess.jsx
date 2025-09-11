import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Divider, 
  List, 
  ListItem, 
  ListItemIcon, 
  ListItemText,
  useTheme
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { 
  CheckCircle as CheckCircleIcon,
  LocalShipping as ShippingIcon,
  Payment as PaymentIcon,
  Home as HomeIcon,
  Restaurant as RestaurantIcon
} from '@mui/icons-material';

const SuccessContainer = styled(Container)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(8),
  textAlign: 'center',
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: 800,
  margin: '0 auto',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 8,
    background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
  },
}));

const AnimatedCheck = styled(Box)({
  width: 100,
  height: 100,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto 24px',
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    animation: 'pulse 2s infinite',
  },
  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)',
      opacity: 1,
    },
    '70%': {
      transform: 'scale(1.5)',
      opacity: 0,
    },
    '100%': {
      opacity: 0,
    },
  },
});

const OrderSuccess = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  
  // In a real app, this would come from the order confirmation response
  const orderDetails = {
    orderId: `#${Math.floor(100000 + Math.random() * 900000)}`,
    estimatedDelivery: new Date(Date.now() + 30 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    items: [
      { name: 'Margherita Pizza', quantity: 2, price: 12.99 },
      { name: 'Pepperoni Pizza', quantity: 1, price: 14.99 },
    ],
    subtotal: 40.97,
    deliveryFee: 2.99,
    total: 43.96,
    deliveryAddress: '123 Pizza Street, Apt 4B, New York, NY 10001',
    paymentMethod: 'VISA ending in 4242',
  };

  const handleBackToMenu = () => {
    navigate('/');
  };

  const handleTrackOrder = () => {
    // In a real app, this would navigate to an order tracking page
    console.log('Track order');
  };

  return (
    <SuccessContainer maxWidth="md">
      <StyledPaper elevation={3}>
        <AnimatedCheck>
          <CheckCircleIcon 
            sx={{ 
              fontSize: 60, 
              color: theme.palette.success.main,
              position: 'relative',
              zIndex: 1,
            }} 
          />
        </AnimatedCheck>
        
        <Typography variant="h4" component="h1" gutterBottom>
          Order Confirmed!
        </Typography>
        
        <Typography variant="h6" color="textSecondary" paragraph>
          Thank you for your order
        </Typography>
        
        <Typography variant="body1" paragraph>
          Your order #{orderDetails.orderId} has been placed and is being prepared.
        </Typography>
        
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center',
            gap: 2,
            mt: 3,
            mb: 4,
          }}
        >
          <Button 
            variant="contained" 
            color="primary"
            onClick={handleTrackOrder}
            startIcon={<ShippingIcon />}
            size="large"
          >
            Track Order
          </Button>
          
          <Button 
            variant="outlined" 
            onClick={handleBackToMenu}
            startIcon={<RestaurantIcon />}
            size="large"
          >
            Back to Menu
          </Button>
        </Box>
        
        <Divider sx={{ my: 4 }} />
        
        <Grid container spacing={4} sx={{ mt: 2, textAlign: 'left' }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ShippingIcon color="primary" sx={{ mr: 1 }} />
              Delivery Information
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Estimated Delivery:</strong> {orderDetails.estimatedDelivery}
            </Typography>
            <Typography variant="body1">
              <strong>Address:</strong> {orderDetails.deliveryAddress}
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <PaymentIcon color="primary" sx={{ mr: 1 }} />
              Payment Information
            </Typography>
            <Typography variant="body1" paragraph>
              <strong>Payment Method:</strong> {orderDetails.paymentMethod}
            </Typography>
            <Typography variant="body1">
              <strong>Order Total:</strong> ${orderDetails.total.toFixed(2)}
            </Typography>
          </Grid>
        </Grid>
        
        <Box sx={{ mt: 4, textAlign: 'left' }}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          <List>
            {orderDetails.items.map((item, index) => (
              <ListItem key={index} disablePadding sx={{ py: 1 }}>
                <ListItemText 
                  primary={`${item.quantity}x ${item.name}`}
                  secondary={`$${(item.price * item.quantity).toFixed(2)}`}
                />
              </ListItem>
            ))}
            <Divider />
            <ListItem disablePadding sx={{ py: 1 }}>
              <ListItemText primary="Subtotal" />
              <Typography>${orderDetails.subtotal.toFixed(2)}</Typography>
            </ListItem>
            <ListItem disablePadding sx={{ py: 1 }}>
              <ListItemText primary="Delivery Fee" />
              <Typography>${orderDetails.deliveryFee.toFixed(2)}</Typography>
            </ListItem>
            <ListItem disablePadding sx={{ py: 1, fontWeight: 'bold' }}>
              <ListItemText primary="Total" />
              <Typography variant="h6">${orderDetails.total.toFixed(2)}</Typography>
            </ListItem>
          </List>
        </Box>
        
        <Box sx={{ mt: 4, pt: 3, borderTop: `1px solid ${theme.palette.divider}` }}>
          <Typography variant="body2" color="textSecondary" align="center">
            Need help? Contact our support team at support@pizzadelivery.com or call (123) 456-7890
          </Typography>
        </Box>
      </StyledPaper>
    </SuccessContainer>
  );
};

export default OrderSuccess;
