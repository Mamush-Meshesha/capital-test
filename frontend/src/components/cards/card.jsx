/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Card,
  Grid,
  Typography,
  Chip,
  Rating,
  Avatar,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: "24px",
  display: "flex",
  flexDirection: "column",
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  overflow: "hidden",
  position: "relative",
  "&:hover": {
    transform: "translateY(-8px)",
    boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
    "& .pizza-image": {
      transform: "scale(1.05)",
    },
    "& .order-button": {
      background: "linear-gradient(45deg, #ff6b35, #f7931e)",
      transform: "translateY(-2px)",
    },
  },
  [theme.breakpoints.down("sm")]: {
    borderRadius: "16px",
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(3),
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #fff5e6 0%, #ffeaa7 100%)",
  margin: theme.spacing(2),
  borderRadius: "20px",
  overflow: "hidden",
}));

const PizzaImage = styled(Box)(({ theme }) => ({
  width: "200px",
  height: "200px",
  borderRadius: "50%",
  background: "linear-gradient(145deg, #ffffff, #f0f0f0)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
  border: "4px solid #ffffff",
  transition: "transform 0.3s ease",
  position: "relative",
  "&::before": {
    content: '""',
    position: "absolute",
    top: "-4px",
    left: "-4px",
    right: "-4px",
    bottom: "-4px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e, #ff6b35)",
    borderRadius: "50%",
    zIndex: -1,
    animation: "rotate 3s linear infinite",
  },
  [theme.breakpoints.down("sm")]: {
    width: "150px",
    height: "150px",
  },
}));

const ContentContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  flex: 1,
  display: "flex",
  flexDirection: "column",
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#2d3436",
  marginBottom: theme.spacing(1),
  lineHeight: 1.2,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const Description = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "0.9rem",
  lineHeight: 1.5,
  marginBottom: theme.spacing(2),
  minHeight: "40px",
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
}));

const ToppingsContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexWrap: "wrap",
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(2),
}));

const ToppingChip = styled(Chip)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  fontSize: "0.75rem",
  height: "24px",
  "& .MuiChip-label": {
    padding: "0 8px",
  },
}));

const PriceSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: theme.spacing(2, 0),
  borderTop: "2px solid #f1f2f6",
  marginTop: "auto",
}));

const Price = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #00b894, #00a085)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontSize: "1.5rem",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const OrderButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  borderRadius: "25px",
  padding: "8px 24px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #e55a2b, #e0841a)",
    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
  },
}));

const RestaurantInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  marginTop: theme.spacing(2),
  padding: theme.spacing(1.5),
  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
  borderRadius: "12px",
  border: "1px solid #dee2e6",
}));

const RestaurantAvatar = styled(Avatar)(({ theme }) => ({
  width: 32,
  height: 32,
  border: "2px solid #ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}));

const RestaurantName = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: "#495057",
  fontSize: "0.85rem",
}));

const CardCom = ({ handlePizzaSelect, pizzaData = [] }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box sx={{ padding: { xs: 2, md: 0 } }}>
      <Grid container spacing={3}>
        {(pizzaData || []).map((pizza) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
            <StyledCard
              onMouseEnter={() => setHoveredCard(pizza.id)}
              onMouseLeave={() => setHoveredCard(null)}
              elevation={0}
            >
              <ImageContainer>
                <PizzaImage className="pizza-image">
                  <Box
                    component="img"
                    src={pizza.image_url || "/one.png"}
                    alt={pizza.name}
                    sx={{
                      width: "85%",
                      height: "85%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                </PizzaImage>
              </ImageContainer>

              <ContentContainer>
                <Title variant="h6" component="h3">
                  {pizza.name}
                </Title>

                <Description variant="body2">
                  {(pizza.toppings || [])
                    .map((topping) => topping.name)
                    .join(", ") || "Delicious pizza with premium ingredients"}
                </Description>

                {(pizza.toppings || []).length > 0 && (
                  <ToppingsContainer>
                    {(pizza.toppings || [])
                      .slice(0, 3)
                      .map((topping, index) => (
                        <ToppingChip
                          key={index}
                          label={topping.name}
                          size="small"
                        />
                      ))}
                    {(pizza.toppings || []).length > 3 && (
                      <ToppingChip
                        label={`+${(pizza.toppings || []).length - 3}`}
                        size="small"
                        sx={{
                          background:
                            "linear-gradient(45deg, #6c5ce7, #a29bfe)",
                        }}
                      />
                    )}
                  </ToppingsContainer>
                )}

                <PriceSection>
                  <Box>
                    <Price variant="h6">
                      {pizza.price}
                      <Typography
                        component="span"
                        sx={{
                          fontSize: "0.7em",
                          color: "#636e72",
                          marginLeft: 0.5,
                        }}
                      >
                        Birr
                      </Typography>
                    </Price>
                  </Box>
                  <OrderButton
                    className="order-button"
                    variant="contained"
                    onClick={() => handlePizzaSelect(pizza)}
                    size="small"
                  >
                    Order Now
                  </OrderButton>
                </PriceSection>

                <RestaurantInfo>
                  <RestaurantAvatar
                    src="/pro.jpg"
                    alt={pizza?.restaurant?.name || "Restaurant"}
                  />
                  <RestaurantName>
                    {pizza?.restaurant?.name || "Premium Restaurant"}
                  </RestaurantName>
                </RestaurantInfo>
              </ContentContainer>
            </StyledCard>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardCom;
