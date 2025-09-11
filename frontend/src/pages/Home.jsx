import {
  Box,
  Card,
  Container,
  TextField,
  Typography,
  Fade,
} from "@mui/material";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Header from "../components/Header";
import Carousel from "react-material-ui-carousel";
import Items from "../components/Carousel";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPizzas, getTopRestaurant } from "../store/slice/pizzaSlice";
import { useNavigate } from "react-router-dom";
import CardCom from "../components/cards/card";
import TopCard from "../components/cards/top";
import Fasting from "../components/cards/fasting";
import { selectPizza } from "../store/slice/orderSlice";
import { styled } from "@mui/material/styles";

const HeroSection = styled(Box)(() => ({
  background: "linear-gradient(135deg, #fff8f1 0%, #ffeaa7 20%, #fff8f1 100%)",
  minHeight: "100vh",
  width: "100%",
  overflowX: "hidden",
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

const HeroContent = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "80vh",
  flexDirection: "column",
  width: "100%",
  position: "relative",
  zIndex: 2,
  padding: theme.spacing(4, 0),
  [theme.breakpoints.down("md")]: {
    minHeight: "70vh",
    padding: theme.spacing(2, 0),
  },
}));

const HeroTitle = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(135deg, #ff6b35, #f7931e, #ff6b35)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 900,
  fontFamily: "Inter, sans-serif",
  lineHeight: 0.9,
  marginBottom: theme.spacing(3),
  textShadow: "0 4px 8px rgba(0,0,0,0.1)",
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem",
  },
}));

const HeroSubtitle = styled(Typography)(({ theme }) => ({
  color: "#636e72",
  lineHeight: 1.6,
  marginBottom: theme.spacing(4),
  maxWidth: "600px",
  [theme.breakpoints.down("md")]: {
    maxWidth: "100%",
  },
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  marginTop: theme.spacing(4),
  width: "100%",
  maxWidth: "600px",
}));

const SearchField = styled(TextField)(() => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: "28px",
    paddingRight: "64px", // Add space for the button
    background: "rgba(255,255,255,0.9)",
    backdropFilter: "blur(10px)",
    border: "2px solid rgba(255,255,255,0.3)",
    boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    "&:hover": {
      border: "2px solid rgba(255, 107, 53, 0.3)",
      boxShadow: "0 12px 40px rgba(0,0,0,0.15)",
    },
    "&.Mui-focused": {
      border: "2px solid #ff6b35",
      boxShadow: "0 12px 40px rgba(255, 107, 53, 0.2)",
    },
  },
  "& .MuiInputBase-input": {
    padding: "16px 24px",
    height: "24px",
    fontSize: "1.1rem",
  },
  width: "100%",
}));

const SearchButton = styled(Box)(({ theme }) => ({
  borderRadius: "50%",
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  position: "absolute",
  width: "52px",
  height: "52px",
  top: "50%",
  right: "6px",
  transform: "translateY(-50%)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
  transition: "all 0.3s ease",
  boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  "&:hover": {
    transform: "translateY(-50%) scale(1.05)",
    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
  },
  [theme.breakpoints.down("sm")]: {
    width: "44px",
    height: "44px",
    right: "4px",
  },
}));

const SectionContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.down("md")]: {
    padding: theme.spacing(4, 0),
  },
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "2.5rem",
  color: "#2d3436",
  marginBottom: theme.spacing(2),
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
  marginBottom: theme.spacing(6),
}));

const TopRestaurantsCard = styled(Card)(({ theme }) => ({
  background: "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
  borderRadius: "24px",
  padding: theme.spacing(4),
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  border: "1px solid rgba(255,255,255,0.2)",
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2),
    borderRadius: "16px",
  },
}));

const SideImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "-200px",
  top: "10%",
  zIndex: 1,
  opacity: 0.8,
  [theme.breakpoints.down("lg")]: {
    display: "none",
  },
}));

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTopRestaurant());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getPizzas());
  }, [dispatch]);
  const navigate = useNavigate();
  const topRestaurants =
    useSelector((state) => state.pizzas.topRestaurants) || [];
  const pizzaData = useSelector((state) => state.pizzas.pizzas) || [];

  const handlePizzaSelect = (pizza) => {
    dispatch(selectPizza(pizza));
    navigate("/order");
  };

  const items = [
    {
      name: "Pizzaa",
      description: "Probably the most random thing you have ever seen!",
      colors: ["#3A1C71", "#D76D77", "#FFAF7B"],
    },
    {
      name: "pizza2",
      description: "awesome pizza!",
      colors: ["#1E3C72", "#2A5298", "#FFAF7B"],
    },
  ];

  return (
    <>
      <HeroSection>
        <Header />
        <Container maxWidth="xl">
          <HeroContent>
            <Fade in timeout={1000}>
              <Box>
                <HeroTitle
                  variant="h1"
                  component="h1"
                  sx={{
                    fontSize: {
                      xs: "4rem",
                      sm: "5rem",
                      md: "6rem",
                      lg: "7rem",
                      xl: "8rem",
                    },
                  }}
                >
                  Order Us
                </HeroTitle>
                <HeroSubtitle
                  variant="h5"
                  component="p"
                  sx={{
                    fontSize: {
                      xs: "1.2rem",
                      md: "1.4rem",
                      lg: "1.6rem",
                    },
                  }}
                >
                  Discover the finest pizza experience with our premium
                  ingredients, authentic recipes, and lightning-fast delivery.
                  Your perfect meal is just a click away!
                </HeroSubtitle>
                <SearchContainer>
                  <SearchField
                    placeholder="Search for your favorite pizza..."
                    type="search"
                    variant="outlined"
                  />
                  <SearchButton>
                    <SearchTwoToneIcon
                      sx={{
                        color: "white",
                        fontSize: { xs: "16px", sm: "18px" },
                      }}
                    />
                  </SearchButton>
                </SearchContainer>
              </Box>
            </Fade>
          </HeroContent>
        </Container>
        <SideImage>
          <Box
            component="img"
            src="/side.png"
            sx={{
              width: "600px",
              height: "600px",
              objectFit: "cover",
              filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.1))",
            }}
          />
        </SideImage>
      </HeroSection>

      <Container maxWidth="xl">
        {/* Featured Section */}
        <SectionContainer>
          <SectionTitle variant="h2" component="h2">
            Featured Pizzas
          </SectionTitle>
          <SectionSubtitle>
            Handpicked selections of our most popular and delicious pizzas
          </SectionSubtitle>
          <Box sx={{ width: "100%" }}>
            <Carousel
              indicatorIconButtonProps={{
                style: {
                  padding: "20px",
                  color: "#d1d5db",
                  width: "24px",
                  height: "24px",
                  transform: "scale(1.5)",
                },
              }}
              activeIndicatorIconButtonProps={{
                style: {
                  color: "#ff6b35",
                },
              }}
              indicatorContainerProps={{
                style: {
                  textAlign: "center",
                  marginTop: "20px",
                },
              }}
              navButtonsProps={{
                style: {
                  backgroundColor: "rgba(255, 107, 53, 0.1)",
                  borderRadius: "50%",
                  color: "#ff6b35",
                },
              }}
            >
              {items.map((item, index) => (
                <Items key={index} item={item} />
              ))}
            </Carousel>
          </Box>
        </SectionContainer>

        {/* Top Restaurants Section */}
        <SectionContainer>
          <SectionTitle variant="h2" component="h2">
            Top Restaurants
          </SectionTitle>
          <SectionSubtitle>
            Discover the most popular and highly-rated restaurants in your area
          </SectionSubtitle>
          <TopRestaurantsCard elevation={0}>
            <TopCard topRestaurants={topRestaurants} />
          </TopRestaurantsCard>
        </SectionContainer>

        {/* Popular Pizza Section */}
        <SectionContainer>
          <SectionTitle variant="h2" component="h2">
            Popular Pizzas
          </SectionTitle>
          <SectionSubtitle>
            Our customers&apos; favorite pizzas, crafted with love and premium
            ingredients
          </SectionSubtitle>
          <CardCom
            handlePizzaSelect={handlePizzaSelect}
            pizzaData={pizzaData}
          />
        </SectionContainer>

        {/* Fasting Menu Section */}
        <SectionContainer>
          <Fasting />
        </SectionContainer>
      </Container>

      <Footer />
    </>
  );
};

export default Home;
