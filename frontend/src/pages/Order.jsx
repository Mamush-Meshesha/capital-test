import {
  Box,
  Button,
  Checkbox,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
  Container,
  Card,
  Chip,
  Divider,
  IconButton,
  Fade,
  Backdrop,
} from "@mui/material";
import Header from "../components/Header";
import { FiArrowUpRight } from "react-icons/fi";
import Related from "../components/Related";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { orderRequest } from "../store/slice/orderSlice";
import { addToCart } from "../store/slice/cartSlice";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";

const OrderContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #fff8f1 0%, #ffeaa7 20%, #fff8f1 100%)",
  minHeight: "100vh",
  padding: theme.spacing(4, 0),
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      "radial-gradient(circle at 20% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(247, 147, 30, 0.1) 0%, transparent 50%)",
    pointerEvents: "none",
  },
}));

const ContentContainer = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  paddingTop: theme.spacing(4),
  paddingBottom: theme.spacing(4),
}));

const PizzaImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.up("md")]: {
    marginBottom: 0,
  },
}));

const PizzaImage = styled(Box)(({ theme }) => ({
  width: "300px",
  height: "300px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #fff5e6 0%, #ffeaa7 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: "0 20px 40px rgba(255, 107, 53, 0.2)",
  border: "8px solid #ffffff",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-8px",
    left: "-8px",
    right: "-8px",
    bottom: "-8px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)",
    borderRadius: "50%",
    zIndex: -1,
    animation: "rotate 4s linear infinite",
  },
  [theme.breakpoints.down("sm")]: {
    width: "250px",
    height: "250px",
  },
}));

const OrderCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "24px",
  padding: theme.spacing(4),
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #ff6b35, #f7931e, #ff6b35)",
  },
}));

const PizzaTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "2.5rem",
  color: "#2d3436",
  marginBottom: theme.spacing(2),
  textAlign: "center",
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const PizzaDescription = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "1.1rem",
  lineHeight: 1.6,
  marginBottom: theme.spacing(3),
  textAlign: "center",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#2d3436",
  marginBottom: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: 0,
    width: "60px",
    height: "3px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    borderRadius: "2px",
  },
}));

const ToppingItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(1, 0),
  borderRadius: "12px",
  marginBottom: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    background: "rgba(255, 107, 53, 0.05)",
    transform: "translateX(5px)",
  },
}));

const ToppingText = styled(ListItemText)(({ theme }) => ({
  "& .MuiListItemText-primary": {
    fontWeight: 600,
    fontSize: "1rem",
    color: "#2d3436",
  },
}));

const QuantityContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(2),
  padding: theme.spacing(3),
  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
  borderRadius: "16px",
  marginBottom: theme.spacing(3),
}));

const QuantityButton = styled(IconButton)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  width: "48px",
  height: "48px",
  boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #e55a2b, #e0841a)",
    transform: "scale(1.1)",
    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
  },
}));

const QuantityText = styled(Typography)(({ theme }) => ({
  fontSize: "2rem",
  fontWeight: 700,
  color: "#2d3436",
  minWidth: "60px",
  textAlign: "center",
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1),
  marginBottom: theme.spacing(3),
}));

const Price = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #00b894, #00a085)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
  fontSize: "3rem",
  lineHeight: 1,
}));

const Currency = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "1.5rem",
  fontWeight: 600,
}));

const OrderButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  borderRadius: "16px",
  padding: "16px 32px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "1.2rem",
  boxShadow: "0 8px 25px rgba(255, 107, 53, 0.4)",
  transition: "all 0.3s ease",
  width: "100%",
  height: "60px",
  "&:hover": {
    background: "linear-gradient(45deg, #e55a2b, #e0841a)",
    boxShadow: "0 12px 35px rgba(255, 107, 53, 0.5)",
    transform: "translateY(-2px)",
  },
}));

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Box)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "24px",
  padding: theme.spacing(6),
  textAlign: "center",
  maxWidth: "500px",
  width: "90%",
  boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
  border: "1px solid rgba(255,255,255,0.2)",
  position: "relative",
  overflow: "hidden",
  "&::before": {
    content: '""',
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "4px",
    background: "linear-gradient(90deg, #00b894, #00a085)",
  },
}));

const SuccessIcon = styled(Box)(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #e8f5e8, #d4edda)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  marginBottom: theme.spacing(3),
  boxShadow: "0 8px 25px rgba(0, 184, 148, 0.2)",
}));

const SuccessTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "2rem",
  color: "#00b894",
  marginBottom: theme.spacing(2),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const ImageDisplayContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "500px",
  position: "relative",
  [theme.breakpoints.up("md")]: {
    minHeight: "600px",
  },
}));

const TriangleContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "400px",
  height: "400px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  [theme.breakpoints.down("sm")]: {
    width: "300px",
    height: "300px",
  },
}));

const SmallImageContainer = styled(Box)(({ theme }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const SmallImage = styled(Box)(({ theme, isSelected, position }) => ({
  width: "90px",
  height: "90px",
  borderRadius: "50%",
  background: isSelected
    ? "linear-gradient(135deg, #ff6b35, #f7931e)"
    : "linear-gradient(135deg, #ffffff, #f8f9fa)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
  border: isSelected ? "4px solid #ff6b35" : "3px solid #e9ecef",
  boxShadow: isSelected
    ? "0 12px 30px rgba(255, 107, 53, 0.4), 0 0 0 8px rgba(255, 107, 53, 0.1)"
    : "0 8px 25px rgba(0,0,0,0.15), 0 0 0 0px rgba(255, 107, 53, 0)",
  transform: isSelected ? "scale(1.15)" : "scale(1)",
  position: "absolute",
  zIndex: 2,
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow:
      "0 10px 30px rgba(255, 107, 53, 0.3), 0 0 0 4px rgba(255, 107, 53, 0.1)",
    border: "4px solid #ff6b35",
  },
  // Bottom positioning
  ...(position === "bottom-left" && {
    bottom: "20px",
    left: "20px",
    transform: isSelected ? "scale(1.15)" : "scale(1)",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }),
  ...(position === "bottom-right" && {
    bottom: "20px",
    right: "20px",
    transform: isSelected ? "scale(1.15)" : "scale(1)",
    "&:hover": {
      transform: "scale(1.1)",
    },
  }),
  [theme.breakpoints.down("sm")]: {
    width: "75px",
    height: "75px",
  },
}));

const RollingImage = styled(Box)(({ theme }) => ({
  width: "280px",
  height: "280px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #fff5e6 0%, #ffeaa7 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  boxShadow:
    "0 25px 50px rgba(255, 107, 53, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)",
  border: "6px solid #ffffff",
  transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
  zIndex: 1,
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-6px",
    left: "-6px",
    right: "-6px",
    bottom: "-6px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)",
    borderRadius: "50%",
    zIndex: -1,
    animation: "rotate 6s linear infinite",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    top: "-12px",
    left: "-12px",
    right: "-12px",
    bottom: "-12px",
    background:
      "linear-gradient(45deg, rgba(255, 107, 53, 0.1), rgba(247, 147, 30, 0.1))",
    borderRadius: "50%",
    zIndex: -2,
    animation: "rotate 8s linear infinite reverse",
  },
  [theme.breakpoints.down("sm")]: {
    width: "220px",
    height: "220px",
  },
}));

const Order = () => {
  const [quantity, setQuantity] = useState(1);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const selectedPizza = useSelector((state) => state?.order?.selectedPizza);

  // Create array of 2 different pizza images for the bottom displayer
  const pizzaImages = [
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&crop=center", // Margherita
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop&crop=center", // Pepperoni
  ];

  const pizzaNames = ["Margherita Classic", "Pepperoni Supreme"];

  useEffect(() => {
    // Initialize selectedToppings with all toppings when the component mounts
    if (selectedPizza && selectedPizza.Toppings) {
      setSelectedToppings(
        selectedPizza.Toppings.map((topping) => topping.name)
      );
    }
  }, [selectedPizza]);

  const handleToppingChange = (toppingName) => {
    setSelectedToppings((prevToppings) =>
      prevToppings.includes(toppingName)
        ? prevToppings.filter((t) => t !== toppingName)
        : [...prevToppings, toppingName]
    );
  };

  const handleImageSelect = (index) => {
    setSelectedImageIndex(index);
  };

  const handleClosePopup = () => {
    setIsOrderPopupOpen(false);
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalPrice = selectedPizza
    ? (selectedPizza.price * quantity).toFixed(2)
    : "0.00";

  const handleOrder = () => {
    if (!selectedPizza) return;

    // Keep original order request if needed by backend
    dispatch(
      orderRequest({
        restaurantId: selectedPizza.restaurants_id,
        items: [
          {
            menuId: selectedPizza.id,
            name: selectedPizza.name,
            price: selectedPizza.price,
            quantity,
            toppings: selectedToppings,
          },
        ],
      })
    );

    // Add to cart and navigate to checkout flow
    dispatch(
      addToCart({
        pizza: selectedPizza,
        toppings: selectedToppings,
        quantity,
      })
    );

    navigate("/checkout");
  };

  return (
    <Box>
      <Header />
      <OrderContainer>
        <ContentContainer maxWidth="xl">
          <Fade in timeout={800}>
            <Box>
              <Grid container spacing={4} alignItems="center">
                {/* Pizza Image Display with Triangle Layout */}
                <Grid item xs={12} md={6}>
                  <ImageDisplayContainer>
                    <TriangleContainer>
                      {/* Large Rolling Image - Centered */}
                      <RollingImage>
                        <Box
                          component="img"
                          src={pizzaImages[selectedImageIndex]}
                          alt={pizzaNames[selectedImageIndex]}
                          sx={{
                            width: "90%",
                            height: "90%",
                            objectFit: "cover",
                            borderRadius: "50%",
                            transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
                            transform: `rotate(${
                              selectedImageIndex * 15
                            }deg) scale(1.05)`,
                          }}
                        />
                      </RollingImage>

                      {/* Small Images - Bottom Two Circles */}
                      <SmallImageContainer>
                        {/* Bottom Left Circle */}
                        <SmallImage
                          position="bottom-left"
                          isSelected={selectedImageIndex === 0}
                          onClick={() => handleImageSelect(0)}
                        >
                          <Box
                            component="img"
                            src={pizzaImages[0]}
                            alt={pizzaNames[0]}
                            sx={{
                              width: "80%",
                              height: "80%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </SmallImage>

                        {/* Bottom Right Circle */}
                        <SmallImage
                          position="bottom-right"
                          isSelected={selectedImageIndex === 1}
                          onClick={() => handleImageSelect(1)}
                        >
                          <Box
                            component="img"
                            src={pizzaImages[1]}
                            alt={pizzaNames[1]}
                            sx={{
                              width: "80%",
                              height: "80%",
                              objectFit: "cover",
                              borderRadius: "50%",
                            }}
                          />
                        </SmallImage>
                      </SmallImageContainer>
                    </TriangleContainer>
                  </ImageDisplayContainer>
                </Grid>

                {/* Order Details */}
                <Grid item xs={12} md={6}>
                  <OrderCard elevation={0}>
                    <PizzaTitle variant="h3" component="h1">
                      {pizzaNames[selectedImageIndex]}
                    </PizzaTitle>

                    <PizzaDescription variant="body1">
                      Customize your perfect pizza with our premium ingredients
                      and create a meal that&apos;s exactly what you&apos;re
                      craving.
                    </PizzaDescription>

                    <Divider sx={{ margin: "24px 0" }} />

                    {/* Toppings Section */}
                    <SectionTitle variant="h5" component="h2">
                      Choose Your Toppings
                    </SectionTitle>

                    <Box sx={{ marginBottom: 4 }}>
                      {selectedPizza && selectedPizza.Toppings ? (
                        selectedPizza.Toppings.map((topping) => (
                          <ToppingItem key={topping.id}>
                            <ListItemIcon>
                              <Checkbox
                                edge="start"
                                checked={selectedToppings.includes(
                                  topping.name
                                )}
                                onChange={() =>
                                  handleToppingChange(topping.name)
                                }
                                tabIndex={-1}
                                disableRipple
                                sx={{
                                  color: "#ff6b35",
                                  "&.Mui-checked": {
                                    color: "#ff6b35",
                                  },
                                }}
                              />
                            </ListItemIcon>
                            <ToppingText primary={topping.name} />
                          </ToppingItem>
                        ))
                      ) : (
                        <Typography variant="body1" color="#636e72">
                          No toppings available for this pizza.
                        </Typography>
                      )}
                    </Box>

                    <Divider sx={{ margin: "24px 0" }} />

                    {/* Quantity Section */}
                    <SectionTitle variant="h5" component="h2">
                      Quantity
                    </SectionTitle>

                    <QuantityContainer>
                      <QuantityButton onClick={decrementQuantity}>
                        <FaMinus />
                      </QuantityButton>
                      <QuantityText>{quantity}</QuantityText>
                      <QuantityButton onClick={incrementQuantity}>
                        <FiPlus />
                      </QuantityButton>
                    </QuantityContainer>

                    {/* Price Section */}
                    <PriceContainer>
                      <Price variant="h3" component="span">
                        {totalPrice}
                      </Price>
                      <Currency variant="h5" component="span">
                        Birr
                      </Currency>
                    </PriceContainer>

                    {/* Order Button */}
                    <OrderButton
                      onClick={handleOrder}
                      variant="contained"
                      endIcon={<FiArrowUpRight size={24} />}
                    >
                      Place Order
                    </OrderButton>
                  </OrderCard>
                </Grid>
              </Grid>

              {/* Success Modal */}
              <StyledModal
                open={isOrderPopupOpen}
                onClose={handleClosePopup}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={isOrderPopupOpen}>
                  <ModalContent>
                    <SuccessIcon>
                      <FaCheckCircle
                        style={{
                          color: "#00b894",
                          width: "60px",
                          height: "60px",
                        }}
                      />
                    </SuccessIcon>
                    <SuccessTitle variant="h4" component="h2">
                      Order Placed Successfully!
                    </SuccessTitle>
                    <Typography
                      variant="body1"
                      color="#636e72"
                      sx={{ marginBottom: 3 }}
                    >
                      Your delicious pizza is being prepared and will be
                      delivered soon.
                    </Typography>
                    <Button
                      onClick={handleClosePopup}
                      variant="contained"
                      sx={{
                        background: "linear-gradient(45deg, #00b894, #00a085)",
                        borderRadius: "25px",
                        padding: "12px 32px",
                        fontWeight: 600,
                      }}
                    >
                      Continue Shopping
                    </Button>
                  </ModalContent>
                </Fade>
              </StyledModal>

              {/* Related Pizzas */}
              <Box sx={{ marginTop: 8 }}>
                <Related />
              </Box>
            </Box>
          </Fade>
        </ContentContainer>
      </OrderContainer>
      <Footer />
    </Box>
  );
};

export default Order;
