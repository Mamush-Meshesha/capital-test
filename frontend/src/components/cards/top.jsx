/* eslint-disable react/prop-types */
import {
  Box,
  Grid,
  Typography,
  Card,
  Avatar,
  Chip,
  Rating,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "20px",
  padding: theme.spacing(3),
  marginBottom: theme.spacing(2),
  boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  overflow: "hidden",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
    "& .restaurant-avatar": {
      transform: "scale(1.1)",
    },
    "& .order-stats": {
      background: "linear-gradient(135deg, #00b894, #00a085)",
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
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(2),
  },
}));

const RestaurantInfo = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const RestaurantAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  border: "4px solid #ffffff",
  boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
  transition: "transform 0.3s ease",
  [theme.breakpoints.down("sm")]: {
    width: 60,
    height: 60,
  },
}));

const RestaurantDetails = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const RestaurantName = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: "#2d3436",
  marginBottom: theme.spacing(0.5),
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.25rem",
  },
}));

const RestaurantDescription = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  fontSize: "0.9rem",
  lineHeight: 1.5,
  marginBottom: theme.spacing(1),
}));

const RatingContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
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
  fontSize: "0.85rem",
  fontWeight: 500,
}));

const OrderStats = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #f2f9f2, #e8f5e8)",
  borderRadius: "16px",
  padding: theme.spacing(2),
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(2),
  transition: "all 0.3s ease",
  border: "1px solid #d4edda",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    textAlign: "center",
    gap: theme.spacing(1),
  },
}));

const OrderIcon = styled(Box)(({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: "50%",
  background: "linear-gradient(45deg, #00b894, #00a085)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0 4px 15px rgba(0, 184, 148, 0.3)",
  [theme.breakpoints.down("sm")]: {
    width: 50,
    height: 50,
  },
}));

const OrderDetails = styled(Box)(({ theme }) => ({
  flex: 1,
}));

const OrderLabel = styled(Typography)(({ theme }) => ({
  color: "#495057",
  fontSize: "0.85rem",
  fontWeight: 500,
  marginBottom: theme.spacing(0.5),
}));

const OrderCount = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #00b894, #00a085)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontSize: "2rem",
  lineHeight: 1,
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const StatusChip = styled(Chip)(({ theme }) => ({
  background: "linear-gradient(45deg, #00b894, #00a085)",
  color: "white",
  fontWeight: 600,
  fontSize: "0.75rem",
  height: "28px",
  "& .MuiChip-label": {
    padding: "0 12px",
  },
}));

const TopCard = ({ topRestaurants }) => {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <Box>
      {topRestaurants.map((res, index) => (
        <StyledCard
          key={index}
          onMouseEnter={() => setHoveredCard(index)}
          onMouseLeave={() => setHoveredCard(null)}
          elevation={0}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={8}>
              <RestaurantInfo>
                <RestaurantAvatar
                  className="restaurant-avatar"
                  src="/pro.jpg"
                  alt={res.name}
                />
                <RestaurantDetails>
                  <RestaurantName variant="h5">{res.name}</RestaurantName>
                  <RestaurantDescription>
                    Experience the finest flavors with our premium ingredients
                    and traditional cooking methods that have been perfected
                    over years.
                  </RestaurantDescription>
                  <RatingContainer>
                    <StyledRating
                      value={4.5}
                      precision={0.5}
                      size="small"
                      readOnly
                    />
                    <RatingText>4.5 (1,234 reviews)</RatingText>
                  </RatingContainer>
                </RestaurantDetails>
              </RestaurantInfo>
            </Grid>

            <Grid item xs={12} md={4}>
              <OrderStats className="order-stats">
                <OrderIcon>
                  <Box
                    component="img"
                    src="/order.png"
                    alt="Orders"
                    sx={{
                      width: "30px",
                      height: "30px",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </OrderIcon>
                <OrderDetails>
                  <OrderLabel>Total Orders</OrderLabel>
                  <OrderCount>100k+</OrderCount>
                </OrderDetails>
              </OrderStats>
            </Grid>
          </Grid>

          <Divider sx={{ margin: "16px 0" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
              <StatusChip label="🔥 Popular" size="small" />
              <StatusChip
                label="⚡ Fast Delivery"
                size="small"
                sx={{
                  background: "linear-gradient(45deg, #6c5ce7, #a29bfe)",
                }}
              />
              <StatusChip
                label="⭐ Top Rated"
                size="small"
                sx={{
                  background: "linear-gradient(45deg, #fdcb6e, #e17055)",
                }}
              />
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: "#636e72",
                fontSize: "0.8rem",
                fontStyle: "italic",
              }}
            >
              #1 in your area
            </Typography>
          </Box>
        </StyledCard>
      ))}
    </Box>
  );
};

export default TopCard;
