import { Box,   Card,  Container,    TextField, Typography } from "@mui/material"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Header from "../components/Header"
import Carousel from "react-material-ui-carousel"
import Items from "../components/Carousel";
import Footer from "../components/Footer";
import { useEffect,  } from "react";
import {useDispatch, useSelector} from "react-redux"
import { getPizzas, getTopRestaurant } from "../store/slice/pizzaSlice";
import { useNavigate } from "react-router-dom";
import CardCom from "../components/cards/card";
import TopCard from "../components/cards/top";
import Fasting from "../components/cards/fasting";

const Home = () => {
  const dispatch = useDispatch()
  const pizzaData = useSelector((state) => state.pizzas.pizzas) || []
  const topRestaurants = useSelector((state) => state.pizzas.topRestaurants) || []
  useEffect(() => {
  dispatch(getPizzas())
  }, [dispatch])
 const isUserLogin = useSelector((state) => state.customer.isUserLogin);
 const navigate = useNavigate();

  
  useEffect(() => {
        console.log(
          `Current path: ${location.pathname}, User logged in: ${isUserLogin}`
        );

    switch (location.pathname) {
      case "/login":
        if (isUserLogin) {
          navigate("/"); 
        }
        break;
      case "/order":
        if (!isUserLogin) {
          navigate("/login"); 
        }
        break;
      default:
        break; 
    }
  }, [isUserLogin, navigate]);

  useEffect(() => {
    dispatch(getTopRestaurant())
  },[dispatch])
  useEffect(() => {
  dispatch(getTopRestaurant())
}, [dispatch])
   const handleOrderClick = (pizza) => {
     navigate("/order", {
       state: {
         id: pizza.id, 
         menuId: pizza.id, 
         name: pizza.name, 
         toppings: pizza.toppings, 
         price: pizza.price, 
         photo: pizza.image_url, 
         restaurantId: pizza.restaurants_id, 
         restaurantName: pizza.Restaurant.name, 
       },
     });
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
        <Box
          sx={{
            background: "#fff8f1",
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <Header />

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              minHeight: "60vh",
              flexDirection: "column",
              paddingX: "120px",
              width: "100vw",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h1"
              component="h2"
              sx={{
                background: "linear-gradient(to right, #ff890e, #ffbe71)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "900",
                fontFamily: "revert",
                fontSize: "230px",
              }}
            >
              Order Us
            </Typography>
            <Typography variant="body1" width="50%" sx={{ fontSize: "34px" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              facere obcaecati neque at ea minima non, sequi tenetur eum
              sapiente nostrum magni quibusdam
            </Typography>
            <Box sx={{ position: "relative", width: "50%", marginTop: "60px" }}>
              <TextField
                placeholder="Search"
                type="search"
                variant="outlined"
                sx={{
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    paddingRight: 0,
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 16px",
                    height: "60px",
                  },
                  width: "100%",
                  background: "#fff",
                  fontSize: "40px",
                }}
              />
              <Box
                sx={{
                  borderRadius: "36px",
                  background: "#ff890f",
                  position: "absolute",
                  width: "72px",
                  height: "72px",
                  top: "4px",
                  right: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchTwoToneIcon sx={{ color: "white", fontSize: "40px" }} />
              </Box>
            </Box>
          </Box>
          {/* Featured section */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              width: "100vw",
              padding: "120px 120px",
            }}
          >
            <Typography
              variant="h2"
              component="h3"
              fontWeight="600"
              fontFamily="Roboto"
              sx={{ color: "#7f7c78" }}
            >
              Featured
            </Typography>
            <Box sx={{ width: "80%", marginTop: "100px" }}>
              <Carousel
                indicatorIconButtonProps={{
                  style: {
                    padding: "34px",
                    color: "#c4c4c5",
                    width: "36px",
                    height: "36px",
                    transform: "scale(3)",
                  },
                }}
                activeIndicatorIconButtonProps={{
                  style: {
                    color: "#ff5722",
                  },
                }}
                indicatorContainerProps={{
                  style: {
                    textAlign: "center",
                  },
                }}
              >
                {items.map((item, index) => (
                  <Items key={index} item={item} />
                ))}
              </Carousel>
            </Box>
          </Box>
          {/* top Restorants */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              width: "100vw",
              padding: "120px 120px",
            }}
          >
            <Box>
              <Typography variant="h1" paddingY="20px">
                Top Restorants
              </Typography>
              <Box display="flex" gap="20px" sx={{}}>
                <Card
                  sx={{
                    background: "#fff",
                    height: "200px",
                    borderRadius: "20px",
                  }}
                >
                  {/* top cards */}
                  <Container>
                    <TopCard topRestaurants={topRestaurants} />
                  </Container>
                </Card>
              </Box>
            </Box>
          </Box>

          {/* popular pizza */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              width: "100vw",
              padding: "120px 120px",
            }}
          >
            <Typography variant="h2" paddingBottom="15px">
              Popular Pizza
            </Typography>

            {/* cards */}
            <CardCom
              handleOrderClick={handleOrderClick}
              pizzaData={pizzaData}
            />
          </Box>
          {/* Fasting */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              flexDirection: "column",
              width: "100vw",
              padding: "120px 120px",
            }}
          >
            <Fasting />
          </Box>

          <Box sx={{ position: "absolute", right: "-370px", top: "2%" }}>
            <Box
              component="img"
              src="/side.png"
              sx={{ width: "860px", height: "860px", objectFit: "cover" }}
            />
          </Box>
        </Box>
        <Footer />
      </>
    );
}

export default Home