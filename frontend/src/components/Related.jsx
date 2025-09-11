import {
  Box,
  Card,
  Container,
  Button,
  Typography,
  Grid,
  Chip,
  Rating,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiArrowUpRight } from "react-icons/fi";

const RelatedContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #fff8f1 0%, #ffeaa7 20%, #fff8f1 100%)",
  padding: theme.spacing(6, 0),
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

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 800,
  fontSize: "2.5rem",
  color: "#2d3436",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-8px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80px",
    height: "4px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    borderRadius: "2px",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2rem",
  },
}));

const SectionSubtitle = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "1.1rem",
  textAlign: "center",
  marginBottom: theme.spacing(4),
  maxWidth: "600px",
  margin: "0 auto",
  marginBottom: theme.spacing(4),
}));

const PizzaCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "24px",
  padding: theme.spacing(3),
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 30px 80px rgba(0,0,0,0.12)",
  },
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

const PizzaImageContainer = styled(Box)(({ theme }) => ({
                      display: "flex",
                      justifyContent: "center",
  marginBottom: theme.spacing(3),
}));

const PizzaImage = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #fff5e6 0%, #ffeaa7 100%)",
                        display: "flex",
                        alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: "0 15px 35px rgba(255, 107, 53, 0.2)",
  border: "6px solid #ffffff",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
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
    animation: "rotate 4s linear infinite",
  },
  [theme.breakpoints.down("sm")]: {
    width: "150px",
    height: "150px",
  },
}));

const PizzaName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#2d3436",
  textAlign: "center",
  marginBottom: theme.spacing(1),
}));

const PizzaDescription = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "0.9rem",
  textAlign: "center",
  marginBottom: theme.spacing(2),
  lineHeight: 1.5,
}));

const ToppingsContainer = styled(Box)(({ theme }) => ({
                      display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(1),
                      justifyContent: "center",
  marginBottom: theme.spacing(2),
}));

const ToppingChip = styled(Chip)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  fontWeight: 600,
  fontSize: "0.8rem",
  height: "28px",
  "& .MuiChip-label": {
    padding: "0 12px",
  },
}));

const PriceSection = styled(Box)(({ theme }) => ({
                        display: "flex",
                        alignItems: "center",
  justifyContent: "space-between",
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
  borderRadius: "16px",
}));

const Price = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #00b894, #00a085)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
  fontSize: "2rem",
  lineHeight: 1,
}));

const Currency = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "1rem",
  fontWeight: 600,
  marginLeft: theme.spacing(0.5),
}));

const OrderButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  borderRadius: "16px",
  padding: "12px 24px",
  fontWeight: 700,
  textTransform: "none",
  fontSize: "1rem",
  boxShadow: "0 8px 25px rgba(255, 107, 53, 0.4)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #e55a2b, #e0841a)",
    boxShadow: "0 12px 35px rgba(255, 107, 53, 0.5)",
    transform: "translateY(-2px)",
  },
}));

const RestaurantInfo = styled(Box)(({ theme }) => ({
                      display: "flex",
  alignItems: "center",
                      justifyContent: "center",
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderTop: "1px solid #e9ecef",
}));

const RestaurantAvatar = styled(Box)(({ theme }) => ({
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
  color: "white",
  fontWeight: 700,
  fontSize: "1rem",
}));

const RestaurantName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  color: "#2d3436",
  fontSize: "0.9rem",
}));

const Related = () => {
  const relatedPizzas = [
    {
      id: 1,
      name: "Margherita Classic",
      description:
        "Fresh tomatoes, mozzarella, and basil on our signature crust",
      image:
        "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=400&fit=crop&crop=center",
      price: 15.99,
      toppings: ["Tomato", "Mozzarella", "Basil"],
      restaurant: "Pizza Palace",
      rating: 4.8,
    },
    {
      id: 2,
      name: "Pepperoni Supreme",
      description: "Spicy pepperoni with extra cheese and our special sauce",
      image:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop&crop=center",
      price: 18.99,
      toppings: ["Pepperoni", "Cheese", "Sauce"],
      restaurant: "Pizza Palace",
      rating: 4.9,
    },
    {
      id: 3,
      name: "Veggie Delight",
      description: "Fresh vegetables and herbs for a healthy pizza experience",
      image:
        "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop&crop=center",
      price: 16.99,
      toppings: ["Bell Peppers", "Mushrooms", "Onions"],
      restaurant: "Pizza Palace",
      rating: 4.7,
    },
    {
      id: 4,
      name: "BBQ Chicken",
      description: "Tender chicken with BBQ sauce and red onions",
      image:
        "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=400&fit=crop&crop=center",
      price: 19.99,
      toppings: ["Chicken", "BBQ Sauce", "Red Onions"],
      restaurant: "Pizza Palace",
      rating: 4.6,
    },
    {
      id: 5,
      name: "Hawaiian Paradise",
      description: "Ham, pineapple, and cheese for a tropical taste",
      image:
        "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop&crop=center",
      price: 17.99,
      toppings: ["Ham", "Pineapple", "Cheese"],
      restaurant: "Pizza Palace",
      rating: 4.5,
    },
    {
      id: 6,
      name: "Meat Lovers",
      description: "Pepperoni, sausage, bacon, and ham for meat enthusiasts",
      image:
        "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400&h=400&fit=crop&crop=center",
      price: 21.99,
      toppings: ["Pepperoni", "Sausage", "Bacon", "Ham"],
      restaurant: "Pizza Palace",
      rating: 4.9,
    },
  ];

  return (
    <RelatedContainer>
      <Container maxWidth="xl">
        <Box sx={{ position: "relative", zIndex: 2 }}>
          <SectionTitle variant="h3" component="h2">
            Related Pizzas
          </SectionTitle>
          <SectionSubtitle variant="body1">
            Discover more delicious pizzas that you might love
          </SectionSubtitle>

          <Grid container spacing={3}>
            {relatedPizzas.map((pizza) => (
              <Grid item xs={12} sm={6} md={4} key={pizza.id}>
                <PizzaCard elevation={0}>
                  <PizzaImageContainer>
                    <PizzaImage>
                      <Box
                        component="img"
                        src={pizza.image}
                        alt={pizza.name}
                        sx={{
                          width: "85%",
                          height: "85%",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    </PizzaImage>
                  </PizzaImageContainer>

                  <PizzaName variant="h5" component="h3">
                    {pizza.name}
                  </PizzaName>

                  <PizzaDescription variant="body2">
                    {pizza.description}
                  </PizzaDescription>

                  <ToppingsContainer>
                    {pizza.toppings.map((topping, index) => (
                      <ToppingChip key={index} label={topping} size="small" />
                    ))}
                  </ToppingsContainer>

                  <PriceSection>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Price variant="h4" component="span">
                        {pizza.price}
                      </Price>
                      <Currency variant="h6" component="span">
                        Birr
                      </Currency>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Rating
                        value={pizza.rating}
                        precision={0.1}
                        readOnly
                        size="small"
                      />
                      <Typography variant="body2" color="#636e72">
                        {pizza.rating}
                      </Typography>
                    </Box>
                  </PriceSection>

                  <OrderButton
                        variant="contained"
                    endIcon={<FiArrowUpRight size={16} />}
                    fullWidth
                  >
                    Order Now
                  </OrderButton>

                  <RestaurantInfo>
                    <RestaurantAvatar>
                      {pizza.restaurant.charAt(0)}
                    </RestaurantAvatar>
                    <RestaurantName variant="body2">
                      {pizza.restaurant}
                    </RestaurantName>
                  </RestaurantInfo>
                </PizzaCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </RelatedContainer>
    );
};

export default Related;
