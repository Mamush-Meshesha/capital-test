import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Box,
  Chip,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";
import { removeFromCart, updateQuantity } from "../store/slice/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, totalAmount, totalQuantity } = useSelector(
    (state) => state.cart
  );

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(
      updateQuantity({
        pizzaId: item.pizza.id,
        toppings: item.toppings,
        quantity: newQuantity,
      })
    );
  };

  const handleRemoveItem = (item) => {
    dispatch(
      removeFromCart({ pizzaId: item.pizza.id, toppings: item.toppings })
    );
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (!items || items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/")}
        >
          Continue Shopping
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        Shopping Cart ({totalQuantity})
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {items.map((item, index) => (
            <Card key={`${item.pizza.id}-${index}`} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3}>
                    <img
                      src={item.pizza.image_url}
                      alt={item.pizza.name}
                      style={{ width: "100%", height: "auto", borderRadius: 8 }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <Typography variant="h6">{item.pizza.name}</Typography>
                    <Typography color="textSecondary">
                      {Number(item.pizza.price).toFixed(2)} Birr
                    </Typography>
                    <Box
                      sx={{
                        mt: 1,
                        display: "flex",
                        gap: 0.5,
                        flexWrap: "wrap",
                      }}
                    >
                      {item.toppings?.map((t) => (
                        <Chip key={t} size="small" label={t} />
                      ))}
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Box display="flex" alignItems="center">
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item, item.quantity - 1)
                        }
                        size="small"
                      >
                        <Remove />
                      </IconButton>
                      <Typography sx={{ mx: 1 }}>{item.quantity}</Typography>
                      <IconButton
                        onClick={() =>
                          handleQuantityChange(item, item.quantity + 1)
                        }
                        size="small"
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography>
                      {(item.pizza.price * item.quantity).toFixed(2)} Birr
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
              <CardActions>
                <Button
                  startIcon={<Delete />}
                  onClick={() => handleRemoveItem(item)}
                  color="error"
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          ))}
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Box display="flex" justifyContent="space-between" mb={2}>
                <Typography>Total Items</Typography>
                <Typography>{totalQuantity}</Typography>
              </Box>
              <Box display="flex" justifyContent="space-between" mb={3}>
                <Typography variant="h6">Total</Typography>
                <Typography variant="h6">
                  {Number(totalAmount).toFixed(2)} Birr
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleCheckout}
                size="large"
              >
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;



