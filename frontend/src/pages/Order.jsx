import { Box,  Button,  Grid2, Typography } from "@mui/material"
import Header from "../components/Header"
import OrderCheck from "../components/Ordering";
import { FiArrowUpRight } from "react-icons/fi";
import Related from "../components/Related";



const Order = () => {

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
                          src="/one.png"
                          width="80%"
                          height="80%"
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
                          src="/one.png"
                          width="80%"
                          height="80%"
                          borderRadius="50%"
                        />
                      </Box>
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
                          src="/one.png"
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
                        <Typography variant="h2" sx={{ fontWeight: "bold" }}>
                          Margharita
                        </Typography>
                        <OrderCheck />
                      </Box>
                      {/* counter */}
                      <Box
                        display="flex"
                        gap="30px"
                        alignItems="center"
                        paddingY="20px"
                      >
                        <Button sx={{ border: "2px solid #ff8508" }}>-</Button>
                        <span>1</span>
                        <Button sx={{ border: "2px solid #ff8508" }}>+</Button>
                        <Typography variant="h2">
                          300 <sup style={{ fontSize: "25px" }}>Birr</sup>
                        </Typography>
                      </Box>
                      <Box>
                        <Button
                          variant="contained"
                          sx={{
                            hieght: "188px",
                            background: "#ff9921",
                            width: "100%",
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "20px",
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
              {/* Related */}
              <Box paddingTop="120px">
                <Related />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
}

export default Order