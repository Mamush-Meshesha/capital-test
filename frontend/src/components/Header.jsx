import {
  AppBar,
  Box,
  Button,
  Grid,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Pizza from "./Piza";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{ background: "transparent", borderBottom: "0", boxShadow: "none" }}
      >
        <Toolbar>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {/* Logo Section */}
            <Grid item xs={6} sm="auto">
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                <Pizza height={40} width={40} />
                <Typography
                  variant={{ xs: "h6", sm: "h5", md: "h4" }}
                  color="#af5901"
                  sx={{ display: { xs: "block" } }}
                >
                  Pizza
                </Typography>
              </Box>
            </Grid>

            {/* Menu Items for Large Screens */}
            <Grid
              item
              sx={{ display: { xs: "none", md: "flex" }, gap: "20px" }}
            >
              <Typography color="#504c48" sx={{ cursor: "pointer" }}>
                Home
              </Typography>
              <Typography color="#504c48" sx={{ cursor: "pointer" }}>
                Orders
              </Typography>
              <Typography color="#504c48" sx={{ cursor: "pointer" }}>
                Who we are
              </Typography>
            </Grid>

            {/* Register Button */}
            <Grid item>
              <Button
                variant="contained"
                sx={{ height: "40px", background: "#ff9921" }}
              >
                Register
              </Button>
            </Grid>

            {/* Hamburger Menu for Small Screens */}
            <Grid item sx={{ display: { xs: "block", md: "none" } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={handleMenuOpen}
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Grid>

          {/* Dropdown Menu for Small Screens */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Home</MenuItem>
            <MenuItem onClick={handleMenuClose}>Orders</MenuItem>
            <MenuItem onClick={handleMenuClose}>Who we are</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
