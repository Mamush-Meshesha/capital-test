import {
  Box,
  Button,
  Checkbox,
  Grid2,
  ListItem,
  ListItemIcon,
  ListItemText,
  Modal,
  Typography,
} from "@mui/material";
import Header from "../components/Header";
import { FiArrowUpRight } from "react-icons/fi";
import Related from "../components/Related";
import { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { orderRequest } from "../store/slice/orderSlice";

const Order = () => {

  

  const [quantity, setQuantity] = useState(1);
  const [isOrderPopupOpen, setIsOrderPopupOpen] = useState(false);
  const [selectedToppings, setSelectedToppings] = useState([]); // Manage selected toppings


  const dispatch = useDispatch();


  const selectedPizza = useSelector((state) => state.orders.selectedPizza);

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

      const orderData = {
        restaurantId: selectedPizza.restaurants_id,
        items: [
          {
            menuId: selectedPizza.id,
            name: selectedPizza.name,
            price: selectedPizza.price,
            quantity: quantity,
            toppings: selectedToppings,
          },
        ],
      };

      dispatch(orderRequest(orderData));
      setIsOrderPopupOpen(true);
    };

  return (
    <Box>
      <Header />
      <Box bgcolor="#fff8f1">
        <Box
          sx={{
            minHeight: "72vh",
            width: "100%",
            overflowX: "hidden",
            position: "relative",
            padding: "100px 0",
            maxWidth: "95%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",

            "@media (min-width: 600px)": {
              maxWidth: "85%",
            },
            "@media (min-width: 960px)": {
              maxWidth: "80%",
            },
            "@media (min-width: 1280px)": {
              maxWidth: "90%",
            },
          }}
        >
          <Box>
            <Box sx={{ width: "100%" }}>
              <Grid2 container spacing="10px" flexDirection="row">
                <Grid2 size={5}>
                  <Box>
                    <Box
                      bgcolor="#fbe0c1"
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: "50vw",
                        height: "50vw",
                        maxWidth: "500px",
                        maxHeight: "500px",
                        borderRadius: "50%",
                        margin: "0 auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={selectedPizza.image_url}
                        width="80%"
                        height="80%"
                        borderRadius="50%"
                      />
                    </Box>
                  </Box>
                </Grid2>
                <Grid2 size={2}>
                  <Grid2 container spacing="30px">
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        width: "50vw",
                        height: "50vw",
                        maxWidth: "250px",
                        maxHeight: "250px",
                        borderRadius: "50%",
                        background: "#d9d9d9",
                        margin: "0 auto",
                      }}
                    >
                      <Box
                        component="img"
                        src={selectedPizza.image_url}
                        width="80%"
                        height="80%"
                        borderRadius="50%"
                      />
                    </Box>
                  </Grid2>
                </Grid2>
                <Grid2
                  size={5}
                  sx={{ width: "100%", maxWidth: 600, margin: "0 auto" }}
                >
                  <Box
                    sx={{
                      maxHeight: "500px",
                      height: "100%",
                      paddingY: "20px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "30px",
                    }}
                  >
                    <Box>
                      {selectedPizza && selectedPizza.Toppings ? (
                        selectedPizza.Toppings.map((topping) => (
                          <ListItem key={topping.id} sx={{ padding: 0 }}>
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
                              />
                            </ListItemIcon>
                            <ListItemText primary={topping.name} />
                          </ListItem>
                        ))
                      ) : (
                        <Typography variant="body1">
                          No toppings available.
                        </Typography>
                      )}
                    </Box>
                    <Box
                      display="flex"
                      gap="30px"
                      alignItems="center"
                      paddingY="20px"
                    >
                      <Button
                        sx={{ border: "2px solid #ff8508" }}
                        onClick={decrementQuantity}
                      >
                        <FaMinus style={{ width: "20px", height: "20px" }} />
                      </Button>
                      <span style={{ fontSize: "28px" }}>{quantity}</span>
                      <Button
                        sx={{ border: "2px solid #ff8508" }}
                        onClick={incrementQuantity}
                      >
                        <FiPlus style={{ width: "20px", height: "20px" }} />
                      </Button>
                      <Typography variant="h2">
                        {totalPrice}{" "}
                        <sup style={{ fontSize: "25px" }}>Birr</sup>
                      </Typography>
                    </Box>
                    <Box>
                      <Button
                        onClick={handleOrder}
                        variant="contained"
                        sx={{
                          height: "88px",
                          background: "#ff9921",
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-between",

                          borderRadius: "12px",
                        }}
                      >
                        <Typography
                          variant="h4"
                          sx={{ textTransform: "capitalize" }}
                        >
                          Order
                        </Typography>
                        <FiArrowUpRight style={{ fontSize: "35px" }} />
                      </Button>
                    </Box>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
            <Modal
              open={isOrderPopupOpen}
              onClose={handleClosePopup}
              aria-labelledby="order-modal-title"
              aria-describedby="order-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 800,
                  height: 500,
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  p: 4,
                  textAlign: "center",
                  borderRadius: "8px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingY: "30px",
                  }}
                >
                  <Box
                    sx={{
                      width: "250px",
                      height: "250px",
                      borderRadius: "50%",
                      bgcolor: "#e6f9e6",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <FaCheckCircle
                      style={{
                        color: "#05c605",
                        width: "150px",
                        height: "150px",
                      }}
                    />
                  </Box>
                </Box>
                <Typography
                  id="order-modal-title"
                  variant="h3"
                  component="h2"
                  color="#05c605"
                >
                  Your Order has been completed Successfully!
                </Typography>
              </Box>
            </Modal>
            {/* Related */}
            <Box paddingTop="120px">
              <Related />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Order;
