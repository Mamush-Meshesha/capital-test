import { Box, Button, Card, Container, Typography } from "@mui/material"

const Fasting = () => {
    
    return (
      <Box>
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
    );
}

export default Fasting