/* eslint-disable react/prop-types */
import { Box, Button, Card,  Grid, Typography } from "@mui/material";

const CardCom = ({ handlePizzaSelect, pizzaData }) => {
  return (
    <Box sx={{ }}>
      <Grid container spacing={4}>
        {pizzaData.map((pizza) => (
          <Grid item xs={12} sm={6} md={6} lg={4} key={pizza.id}>
            <Card
              sx={{
                height: "100%",
                borderRadius: "23px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ p: 2 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <Box
                    sx={{
                      width: "300px",
                      paddingTop: "300px",
                      position: "relative",
                      background: "#fbe6cc",
                      borderRadius: "50%",
                    }}
                  >
                    <Box
                      component="img"
                      src={pizza.image_url}
                      sx={{
                        position: "absolute",
                        top: "10%",
                        left: "10%",
                        width: "80%",
                        height: "80%",
                        borderRadius: "50%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                </Box>
                <Typography variant="h5" color="#000000" gutterBottom>
                  {pizza.name}
                </Typography>
                <Typography variant="body2" color="#6f6f6f" gutterBottom>
                  {pizza.Toppings.map((topping) => topping.name).join(", ")}
                </Typography>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  py={2}
                  borderBottom="4px solid #d8d8d8"
                >
                  <Typography variant="h6" color="green">
                    {pizza.price}
                    <Typography
                      component="sup"
                      variant="caption"
                      color="textPrimary"
                    >
                      Birr
                    </Typography>
                  </Typography>
                  <Button
                    variant="contained"
                    sx={{
                      background: "#ff9921",
                      "&:hover": {
                        background: "#e68a1e",
                      },
                    }}
                    onClick={() => handlePizzaSelect(pizza)}
                  >
                    Order
                  </Button>
                </Box>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="flex-start"
                  gap="10px"
                  mt={2}
                >
                  <Box
                    component="img"
                    src="/pro.jpg"
                    sx={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                  <Typography variant="body2" fontWeight="400">
                    {pizza.Restaurant.name}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CardCom;
