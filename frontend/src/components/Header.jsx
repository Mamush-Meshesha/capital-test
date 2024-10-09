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
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Pizza from "./Piza";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { logoutRequest } from "../store/slice/userSlice";

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const user = useSelector((state) => state.customer.user) || null;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchorEl(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchorEl(null);
  };

  const handleLogout = () => {
    // Implement logout logic here
    // For example:
    dispatch(logoutRequest());
    handleUserMenuClose();
    navigate("/login");
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

            {/* User Menu or Login Button */}
            <Grid item>
              {user && user.email ? (
                <>
                  <IconButton onClick={handleUserMenuOpen} color="inherit">
                    <Avatar sx={{ bgcolor: "#ff9921" }}>
                      <AccountCircleIcon />
                    </Avatar>
                  </IconButton>
                  <Menu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
                  >
                    <MenuItem onClick={handleUserMenuClose}>Profile</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{ height: "40px", background: "#ff9921" }}
                >
                  <Link
                    style={{
                      outline: "none",
                      textDecoration: "none",
                      color: "white",
                    }}
                    to="/login"
                  >
                    Login
                  </Link>
                </Button>
              )}
            </Grid>

            {/* Mobile Menu Button */}
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

          {/* Mobile Menu */}
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
