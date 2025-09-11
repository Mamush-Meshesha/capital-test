import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  Card, 
  CardContent, 
  CardActions, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  IconButton,
  Divider,
  Paper,
  Container,
  Grid,
  Chip
} from '@mui/material';
import { 
  Add as AddIcon, 
  Remove as RemoveIcon, 
  Delete as DeleteIcon,
  ShoppingCart as ShoppingCartIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { addToCart, removeFromCart, updateQuantity, loadCart } from '../store/slice/cartSlice';

const CartContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
}));

const CartItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  '&:not(:last-child)': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const QuantityControls = styled('div')({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
});

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalQuantity, totalAmount } = useSelector((state) => state.cart);

  useEffect(() => {
    // Load cart from localStorage on component mount
    dispatch(loadCart());
  }, [dispatch]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({
      pizzaId: item.pizza.id,
      toppings: item.toppings,
      quantity: newQuantity
    }));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeFromCart({
      pizzaId: item.pizza.id,
      toppings: item.toppings
    }));
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <Box 
        display="flex" 
        flexDirection="column" 
        alignItems="center" 
        justifyContent="center" 
        minHeight="60vh"
        textAlign="center"
        p={3}
      >
        <ShoppingCartIcon style={{ fontSize: 80, color: '#ccc', marginBottom: 16 }} />
        <Typography variant="h5" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Looks like you haven't added any pizzas to your cart yet.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Browse Pizzas
        </Button>
      </Box>
    );
  }

  return (
    <CartContainer maxWidth="lg">
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Shopping Cart ({totalQuantity} {totalQuantity === 1 ? 'item' : 'items'})
              </Typography>
              <List>
                {items.map((item, index) => (
                  <React.Fragment key={index}>
                    <CartItem>
                      <Box flexGrow={1}>
                        <Typography variant="subtitle1">
                          {item.pizza.name}
                        </Typography>
                        {item.toppings.length > 0 && (
                          <Box mt={1}>
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
                      </Box>
                      <ListItemSecondaryAction>
                        <Box display="flex" alignItems="center">
                          <QuantityControls>
                            <IconButton 
                              size="small" 
                              onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            >
                              <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography variant="body1">{item.quantity}</Typography>
                            <IconButton 
                              size="small" 
                              onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            >
                              <AddIcon fontSize="small" />
                            </IconButton>
                          </QuantityControls>
                          <Typography variant="h6" sx={{ minWidth: 80, textAlign: 'right', ml: 2 }}>
                            ${(item.pizza.price * item.quantity).toFixed(2)}
                          </Typography>
                          <IconButton 
                            edge="end" 
                            aria-label="delete"
                            onClick={() => handleRemoveItem(item)}
                            sx={{ ml: 1 }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Box>
                      </ListItemSecondaryAction>
                    </CartItem>
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </StyledCard>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={1}>
                <Typography>Subtotal ({totalQuantity} items)</Typography>
                <Typography>${totalAmount.toFixed(2)}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Delivery Fee</Typography>
                <Typography>$2.99</Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography variant="subtitle1">Total</Typography>
                <Typography variant="subtitle1">
                  ${(totalAmount + 2.99).toFixed(2)}
                </Typography>
              </Box>
              <Button 
                fullWidth 
                variant="contained" 
                color="primary" 
                size="large"
                onClick={handleCheckout}
                sx={{ mt: 2 }}
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </CartContainer>
  );
};

export default Cart;
