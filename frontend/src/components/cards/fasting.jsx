import {
  Box,
  Button,
  Card,
  Typography,
  Avatar,
  Chip,
  Rating,
  Grid,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const FastingContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2, 0),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontSize: "2.5rem",
  marginBottom: theme.spacing(3),
  textAlign: "center",
  position: "relative",
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-10px",
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
  maxWidth: "600px",
  margin: "0 auto",
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "24px",
  padding: theme.spacing(3),
  boxShadow: "0 12px 40px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  position: "relative",
  overflow: "hidden",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
    "& .pizza-image": {
      transform: "scale(1.05)",
    },
    "& .order-button": {
      background: "linear-gradient(45deg, #e55a2b, #e0841a)",
      transform: "translateY(-2px)",
    },
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
  [theme.breakpoints.down("sm")]: {
    borderRadius: "16px",
    padding: theme.spacing(2),
  },
}));

const ImageContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  marginBottom: theme.spacing(2),
  position: "relative",
}));

const PizzaImageContainer = styled(Box)(({ theme }) => ({
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  background: "linear-gradient(135deg, #fff5e6 0%, #ffeaa7 100%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  boxShadow: "0 8px 24px rgba(255, 107, 53, 0.2)",
  border: "4px solid #ffffff",
  transition: "transform 0.3s ease",
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
}));

const PizzaImage = styled(Box)(({ theme }) => ({
  width: "85%",
  height: "85%",
  borderRadius: "50%",
  overflow: "hidden",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ContentSection = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(2),
}));

const PizzaName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#2d3436",
  marginBottom: theme.spacing(1),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const PizzaDescription = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "0.9rem",
  lineHeight: 1.5,
  marginBottom: theme.spacing(2),
  maxWidth: "300px",
  margin: "0 auto",
  marginBottom: theme.spacing(2),
}));

const FeaturesContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  gap: theme.spacing(0.5),
  marginBottom: theme.spacing(2),
  flexWrap: "wrap",
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  fontWeight: 600,
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
  marginBottom: theme.spacing(2),
}));

const PriceContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: theme.spacing(0.5),
}));

const Price = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #00b894, #00a085)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontSize: "1.8rem",
  lineHeight: 1,
}));

const Currency = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "1rem",
  fontWeight: 600,
}));

const OrderButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  borderRadius: "25px",
  padding: "8px 20px",
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

const RestaurantSection = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: theme.spacing(1.5),
  padding: theme.spacing(1.5),
  background: "linear-gradient(135deg, #f8f9fa, #e9ecef)",
  borderRadius: "12px",
  border: "1px solid #dee2e6",
}));

const RestaurantAvatar = styled(Avatar)(({ theme }) => ({
  width: 40,
  height: 40,
  border: "2px solid #ffffff",
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}));

const RestaurantInfo = styled(Box)(({ theme }) => ({
  textAlign: "left",
}));

const RestaurantName = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: "0.9rem",
  color: "#2d3436",
  marginBottom: theme.spacing(0.25),
}));

const RestaurantRating = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(0.5),
}));

const StyledRating = styled(Rating)(({ theme }) => ({
  "& .MuiRating-iconFilled": {
    color: "#ffd700",
  },
  "& .MuiRating-iconEmpty": {
    color: "#e0e0e0",
  },
}));

const RatingText = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "0.75rem",
  fontWeight: 500,
}));

const Fasting = () => {
  const [isHovered, setIsHovered] = useState(false);
    
    return (
    <FastingContainer>
      <SectionTitle variant="h2" component="h2">
        Special Fasting Menu
      </SectionTitle>
      <SectionSubtitle>
        Perfect for fasting days with authentic flavors and premium ingredients
      </SectionSubtitle>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <StyledCard
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            elevation={0}
          >
            <ImageContainer>
              <PizzaImageContainer className="pizza-image">
                <PizzaImage>
                  <Box
                    component="img"
                    src="/one.png"
                    alt="Margherita Pizza"
                sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </PizzaImage>
              </PizzaImageContainer>
            </ImageContainer>

            <ContentSection>
              <PizzaName variant="h4" component="h3">
                Margherita Special
              </PizzaName>

              <PizzaDescription variant="body2">
                Traditional Italian pizza with fresh tomatoes, mozzarella, and
                basil.
              </PizzaDescription>

              <FeaturesContainer>
                <FeatureChip label="🍅 Fresh" />
                <FeatureChip label="🧀 Premium" />
                <FeatureChip label="🌿 Basil" />
              </FeaturesContainer>
            </ContentSection>

            <PriceSection>
              <PriceContainer>
                <Price variant="h5" component="span">
                  150
                </Price>
                <Currency variant="body1" component="span">
                  Birr
                </Currency>
              </PriceContainer>

              <OrderButton
                className="order-button"
                variant="contained"
                size="small"
              >
                Order Now
              </OrderButton>
            </PriceSection>

            <RestaurantSection>
              <RestaurantAvatar src="/pro.jpg" alt="Sky Light Restaurant" />
              <RestaurantInfo>
                <RestaurantName>Sky Light</RestaurantName>
                <RestaurantRating>
                  <StyledRating
                    value={4.8}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <RatingText>4.8</RatingText>
                </RestaurantRating>
              </RestaurantInfo>
            </RestaurantSection>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            elevation={0}
          >
            <ImageContainer>
              <PizzaImageContainer className="pizza-image">
                <PizzaImage>
                <Box
                  component="img"
                  src="/one.png"
                    alt="Veggie Delight"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </PizzaImage>
              </PizzaImageContainer>
            </ImageContainer>

            <ContentSection>
              <PizzaName variant="h4" component="h3">
                Veggie Delight
              </PizzaName>

              <PizzaDescription variant="body2">
                Loaded with fresh vegetables, perfect for a healthy fasting
                meal.
              </PizzaDescription>

              <FeaturesContainer>
                <FeatureChip label="🥬 Fresh" />
                <FeatureChip label="🥕 Healthy" />
                <FeatureChip label="🌶️ Spicy" />
              </FeaturesContainer>
            </ContentSection>

            <PriceSection>
              <PriceContainer>
                <Price variant="h5" component="span">
                  120
                </Price>
                <Currency variant="body1" component="span">
                  Birr
                </Currency>
              </PriceContainer>

              <OrderButton
                className="order-button"
                variant="contained"
                size="small"
              >
                Order Now
              </OrderButton>
            </PriceSection>

            <RestaurantSection>
              <RestaurantAvatar src="/pro.jpg" alt="Green Garden" />
              <RestaurantInfo>
                <RestaurantName>Green Garden</RestaurantName>
                <RestaurantRating>
                  <StyledRating
                    value={4.6}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <RatingText>4.6</RatingText>
                </RestaurantRating>
              </RestaurantInfo>
            </RestaurantSection>
          </StyledCard>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <StyledCard
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            elevation={0}
          >
            <ImageContainer>
              <PizzaImageContainer className="pizza-image">
                <PizzaImage>
                  <Box
                    component="img"
                    src="/one.png"
                    alt="Mediterranean"
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </PizzaImage>
              </PizzaImageContainer>
            </ImageContainer>

            <ContentSection>
              <PizzaName variant="h4" component="h3">
                Mediterranean
              </PizzaName>

              <PizzaDescription variant="body2">
                Mediterranean flavors with olives, tomatoes, and herbs.
              </PizzaDescription>

              <FeaturesContainer>
                <FeatureChip label="🫒 Olives" />
                <FeatureChip label="🍅 Tomatoes" />
                <FeatureChip label="🌿 Herbs" />
              </FeaturesContainer>
            </ContentSection>

            <PriceSection>
              <PriceContainer>
                <Price variant="h5" component="span">
                  140
                </Price>
                <Currency variant="body1" component="span">
                  Birr
                </Currency>
              </PriceContainer>

              <OrderButton
                className="order-button"
                variant="contained"
                size="small"
              >
                Order Now
              </OrderButton>
            </PriceSection>

            <RestaurantSection>
              <RestaurantAvatar src="/pro.jpg" alt="Mediterranean Bistro" />
              <RestaurantInfo>
                <RestaurantName>Mediterranean Bistro</RestaurantName>
                <RestaurantRating>
                  <StyledRating
                    value={4.7}
                    precision={0.1}
                    size="small"
                    readOnly
                  />
                  <RatingText>4.7</RatingText>
                </RestaurantRating>
              </RestaurantInfo>
            </RestaurantSection>
          </StyledCard>
        </Grid>
      </Grid>
    </FastingContainer>
  );
};

export default Fasting;
