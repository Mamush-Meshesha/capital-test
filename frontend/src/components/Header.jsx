import { AppBar, Box, Button, Grid2, Toolbar, Typography } from "@mui/material";
import Pizza from "./Piza";

const Header = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "transparent", borderBottom: "0", boxShadow: "none" }}
      >
        <Toolbar>
          <Grid2
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            sx={{ width: "100%" }}
          >
            <Grid2 size="auto">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Pizza hieght={50} width={50} />
                <Typography variant="h4" color="#af5901">
                  Pizza
                </Typography>
              </Box>
            </Grid2>
            <Grid2 size="auto">
              <Typography color="#504c48">Home</Typography>
            </Grid2>
            <Grid2>
              <Typography color="#504c48">Orders</Typography>
            </Grid2>
            <Grid2 size="auto">
              <Typography color="#504c48">Who we are</Typography>
            </Grid2>
            <Grid2 size="auto">
              <Button
                variant="contained"
                sx={{ hieght: "48px", background: "#ff9921" }}
              >
                Register
              </Button>
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
