import { Box,  Button,  Card,  Container,  Grid2,  TextField, Typography } from "@mui/material"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Header from "../components/Header"
import Carousel from "react-material-ui-carousel"
import Items from "../components/Carousel";
import Footer from "../components/Footer";

const Home = () => {

   const items = [
     {
       name: "Random Name #1",
       description: "Probably the most random thing you have ever seen!",
       colors: ["#3A1C71", "#D76D77", "#FFAF7B"],
     },
     {
       name: "Random Name #2",
       description: "Hello World!",
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
              sapiente nostrum magni quibusdam quisquam inventore
              necessitatibus! Ut id assumenda suscipit, quia dolore consequuntur
              non ducimus quo quaerat dignissimos, fuga doloremque corrupti qui
              aspernatur. Aut, cumque? Sint itaque natus quasi.
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
                  <Container>
                    <Grid2 container spacing={6} alignItems="center">
                      <Grid2 size={6}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          paddingY="10px"
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
                          <Typography variant="h4" fontWeight="400">
                            Mamush
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, cupiditate.
                          </Typography>
                        </Box>
                      </Grid2>
                      {/* side orders number */}
                      <Grid2 size={6} alignItems="center" display="flex">
                        <Box display="flex" gap="10px" paddingY="10px">
                          <Box
                            height="100"
                            width="100vh"
                            alignItems="center"
                            sx={{ background: "#f2f9f2" }}
                          >
                            <Box display="flex">
                              <Box
                                component="img"
                                src="/order.png"
                                sx={{ width: "100px", height: "100px" }}
                              />
                              <Box>
                                <Typography variant="h6">
                                  Number of Orders
                                </Typography>
                                <Typography variant="h2">100k</Typography>
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Container>
                </Card>
                <Card
                  sx={{
                    background: "#fff",
                    height: "200px",
                    borderRadius: "20px",
                  }}
                >
                  <Container>
                    <Grid2 container spacing={6}>
                      <Grid2 size={6}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          paddingY="10px"
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
                          <Typography variant="h4" fontWeight="400">
                            Mamush
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, cupiditate.
                          </Typography>
                        </Box>
                      </Grid2>
                      {/* side orders number */}
                      <Grid2 size={6}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          height="100%"
                          paddingY="10px"
                        >
                          <Box sx={{ background: "#f2f9f2" }}>
                            <Box></Box>
                          </Box>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Container>
                </Card>
                <Card
                  sx={{
                    background: "#fff",
                    height: "200px",
                    borderRadius: "20px",
                  }}
                >
                  <Container>
                    <Grid2 container spacing={6}>
                      <Grid2 size={6}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          paddingY="10px"
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
                          <Typography variant="h4" fontWeight="400">
                            Mamush
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body1">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Quae, cupiditate.
                          </Typography>
                        </Box>
                      </Grid2>
                      {/* side orders number */}
                      <Grid2 size={6}>
                        <Box
                          display="flex"
                          alignItems="center"
                          gap="10px"
                          height="100%"
                          paddingY="10px"
                        >
                          <Box sx={{ background: "#f2f9f2" }}>hello</Box>
                        </Box>
                      </Grid2>
                    </Grid2>
                  </Container>
                </Card>
              </Box>
            </Box>
          </Box>

          {/* popular pizza */}
          <Box>
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
              <Box>
                <Card
                  sx={{ height: "auto", width: "500px", borderRadius: "23px" }}
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
                          src="/one.png"
                          width="80%"
                          sx={{ objectFit: "fill" }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <Box>
                        <Typography variant="h3" color="#000000">
                          Marghareta
                        </Typography>
                        <Typography variant="body1" color="#6f6f6f">
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Quibusdam hic assumenda corrupti?
                        </Typography>
                      </Box>
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        padding="20px"
                        borderBottom="4px solid #d8d8d8"
                      >
                        <Typography variant="h2" color="green">
                          150
                          <sup style={{ fontSize: "20px", color: "black" }}>
                            Birr
                          </sup>{" "}
                        </Typography>
                        <Button
                          variant="contained"
                          sx={{
                            hieght: "48px",
                            background: "#ff9921",
                            fontSize: "35px",
                          }}
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
                            Sky light
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Card>
              </Box>
            </Box>
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
            <Typography variant="h2">Fasting</Typography>
            <Card sx={{ height: "auto", width: "500px", borderRadius: "23px" }}>
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
                      src="/one.png"
                      width="80%"
                      sx={{ objectFit: "fill" }}
                    />
                  </Box>
                </Box>
                <Box>
                  <Box>
                    <Typography variant="h3" color="#000000">
                      Marghareta
                    </Typography>
                    <Typography variant="body1" color="#6f6f6f">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Quibusdam hic assumenda corrupti?
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    padding="20px"
                    borderBottom="4px solid #d8d8d8"
                  >
                    <Typography variant="h2" color="green">
                      150
                      <sup style={{ fontSize: "20px", color: "black" }}>
                        Birr
                      </sup>{" "}
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        hieght: "48px",
                        background: "#ff9921",
                        fontSize: "35px",
                      }}
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
                        Sky light
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Container>
            </Card>
          </Box>

          <Box sx={{ position: "absolute", right: "-340px", top: "8%" }}>
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