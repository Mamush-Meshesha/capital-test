/* eslint-disable react/prop-types */
import { Box, Button, Card, Container, Grid2, Typography } from "@mui/material"
const CardCom = ({ handlePizzaSelect, pizzaData }) => {
  return (
    <Box>
      <Grid2 container spacing={4}>
        {pizzaData.map((pizza) => (
          <Grid2 item xs={12} sm={6} md={4} lg={3} key={pizza.id}>
            {" "}
            <Card
              sx={{
                height: "auto",
                borderRadius: "23px",
                marginBottom: "20px",
              }}
            >
              <Container>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "30px",
                  }}
                >
                  <Box
                    width="320px"
                    height="320px"
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      background: "#fbe6cc",
                      borderRadius: "50%",
                      justifyContent: "center",
                    }}
                  >
                    <Box
                      component="img"
                      src={pizza.image_url}
                      width="80%"
                      borderRadius="50%"
                      sx={{ objectFit: "fill" }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography variant="h3" color="#000000">
                      {pizza.name}{" "}
                    </Typography>
                    <Typography variant="body1" color="#6f6f6f">
                      {pizza.Toppings.map((topping) => topping.name).join(", ")}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    padding="20px"
                    borderBottom="4px solid #d8d8d8"
                  >
                    <Typography variant="h2" color="green">
                      {pizza.price}
                      <sup style={{ fontSize: "20px", color: "black" }}>
                        Birr
                      </sup>
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        height: "48px",
                        background: "#ff9921",
                        fontSize: "35px",
                      }}
                      onClick={() => handlePizzaSelect(pizza)}
                    >
                      Order
                    </Button>
                  </Box>
                  <Box>
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="space-between"
                      gap="10px"
                      padding="30px"
                    >
                      <Box
                        component="img"
                        src="/pro.jpg"
                        sx={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "40px",
                          objectPosition: "contained",
                        }}
                      />
                      <Typography variant="h5" fontWeight="400">
                        {pizza.Restaurant.name}{" "}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
};

export default CardCom

  // const handleToppingChange = (toppingName) => {
  //   setSelectedToppings((prevSelected) => {
  //     const isSelected = prevSelected.includes(toppingName);
  //     return isSelected
  //       ? prevSelected.filter((name) => name !== toppingName) // Remove if already selected
  //       : [...prevSelected, toppingName]; // Add if not selected
  //   });
  // };
