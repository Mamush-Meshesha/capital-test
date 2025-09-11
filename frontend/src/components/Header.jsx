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
  Container,
  Badge,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import Pizza from "./Piza";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logout } from "../store/slice/authSlice";
import { styled } from "@mui/material/styles";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: "rgba(255, 255, 255, 0.95)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid rgba(255, 107, 53, 0.1)",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.08)",
  position: "sticky",
  top: 0,
  zIndex: 1100,
}));

const LogoContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1.5),
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));

const LogoText = styled(Typography)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 800,
  fontFamily: "Inter, sans-serif",
  fontSize: "1.8rem",
  letterSpacing: "-0.5px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.5rem",
  },
}));

const NavLink = styled(Typography)(({ theme }) => ({
  color: "#2d3436",
  fontWeight: 600,
  fontSize: "1rem",
  cursor: "pointer",
  padding: theme.spacing(1, 2),
  borderRadius: "8px",
  transition: "all 0.3s ease",
  position: "relative",
  "&:hover": {
    color: "#ff6b35",
    background: "rgba(255, 107, 53, 0.1)",
    transform: "translateY(-1px)",
  },
  "&::after": {
    content: '""',
    position: "absolute",
    bottom: "-2px",
    left: "50%",
    transform: "translateX(-50%)",
    width: 0,
    height: "2px",
    background: "linear-gradient(45deg, #ff6b35, #f7931e)",
    transition: "width 0.3s ease",
  },
  "&:hover::after": {
    width: "80%",
  },
}));

const LoginButton = styled(Button)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  color: "white",
  borderRadius: "25px",
  padding: "8px 24px",
  fontWeight: 600,
  textTransform: "none",
  fontSize: "0.9rem",
  boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(45deg, #e55a2b, #e0841a)",
    boxShadow: "0 6px 20px rgba(255, 107, 53, 0.4)",
    transform: "translateY(-2px)",
  },
}));

const UserAvatar = styled(Avatar)(({ theme }) => ({
  background: "linear-gradient(45deg, #ff6b35, #f7931e)",
  width: 40,
  height: 40,
  cursor: "pointer",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.1)",
    boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
  },
}));

const CartButton = styled(IconButton)(({ theme }) => ({
  color: "#2d3436",
  marginRight: theme.spacing(1),
  transition: "all 0.3s ease",
  "&:hover": {
    color: "#ff6b35",
    background: "rgba(255, 107, 53, 0.1)",
    transform: "scale(1.1)",
  },
}));

const MobileMenuButton = styled(IconButton)(({ theme }) => ({
  color: "#2d3436",
  "&:hover": {
    color: "#ff6b35",
    background: "rgba(255, 107, 53, 0.1)",
  },
}));

const StyledMenu = styled(Menu)(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: "16px",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
    border: "1px solid rgba(255, 107, 53, 0.1)",
    marginTop: theme.spacing(1),
  },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  padding: theme.spacing(1.5, 2),
  fontSize: "1rem",
  fontWeight: 500,
  color: "#2d3436",
  "&:hover": {
    background: "rgba(255, 107, 53, 0.1)",
    color: "#ff6b35",
  },
}));

const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchorEl, setUserMenuAnchorEl] = useState(null);

  const user = useSelector((state) => state?.auth?.user) || null;
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
    dispatch(logout());
    handleUserMenuClose();
    navigate("/login");
  };

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar sx={{ padding: { xs: 1, sm: 2 } }}>
          <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: "100%" }}
          >
            {/* Logo Section */}
            <Grid item xs={6} sm="auto">
              <LogoContainer
                onClick={() => {
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
              >
                <Pizza height={45} width={45} />
                <LogoText variant="h4" component="h1">
                  PizzaHub
                </LogoText>
              </LogoContainer>
            </Grid>

            {/* Menu Items for Large Screens */}
            <Grid
              item
              sx={{
                display: { xs: "none", md: "flex" },
                gap: { md: 1, lg: 2 },
                alignItems: "center",
              }}
            >
              <NavLink
                onClick={() => {
                  navigate("/");
                  window.scrollTo(0, 0);
                }}
              >
                Home
              </NavLink>
              <NavLink
                onClick={() => {
                  navigate("/menu");
                  window.scrollTo(0, 0);
                }}
              >
                Menu
              </NavLink>
              <NavLink
                onClick={() => {
                  navigate("/orders");
                  window.scrollTo(0, 0);
                }}
              >
                Orders
              </NavLink>
              <NavLink
                onClick={() => {
                  navigate("/about");
                  window.scrollTo(0, 0);
                }}
              >
                About Us
              </NavLink>
            </Grid>

            {/* Right Side Actions */}
            <Grid item sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              {/* Cart Button */}
              <CartButton size="large">
                <Badge badgeContent={0} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </CartButton>

            {/* User Menu or Login Button */}
              {user && user.email ? (
                <>
                  <UserAvatar onClick={handleUserMenuOpen}>
                      <AccountCircleIcon />
                  </UserAvatar>
                  <StyledMenu
                    anchorEl={userMenuAnchorEl}
                    open={Boolean(userMenuAnchorEl)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <StyledMenuItem
                      onClick={() => {
                        navigate("/profile");
                        window.scrollTo(0, 0);
                        handleUserMenuClose();
                      }}
                    >
                      Profile
                    </StyledMenuItem>
                    <StyledMenuItem
                      onClick={() => {
                        navigate("/orders");
                        window.scrollTo(0, 0);
                        handleUserMenuClose();
                      }}
                    >
                      My Orders
                    </StyledMenuItem>
                    <Divider />
                    <StyledMenuItem onClick={handleLogout}>
                      Logout
                    </StyledMenuItem>
                  </StyledMenu>
                </>
              ) : (
                <LoginButton variant="contained">
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
                </LoginButton>
              )}

            {/* Mobile Menu Button */}
              <MobileMenuButton
                edge="start"
                aria-label="menu"
                onClick={handleMenuOpen}
                sx={{ display: { xs: "block", md: "none" } }}
              >
                <MenuIcon />
              </MobileMenuButton>
            </Grid>
          </Grid>

          {/* Mobile Menu */}
          <StyledMenu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <StyledMenuItem
              onClick={() => {
                navigate("/");
                window.scrollTo(0, 0);
                handleMenuClose();
              }}
            >
              Home
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => {
                navigate("/menu");
                window.scrollTo(0, 0);
                handleMenuClose();
              }}
            >
              Menu
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => {
                navigate("/orders");
                window.scrollTo(0, 0);
                handleMenuClose();
              }}
            >
              Orders
            </StyledMenuItem>
            <StyledMenuItem
              onClick={() => {
                navigate("/about");
                window.scrollTo(0, 0);
                handleMenuClose();
              }}
            >
              About Us
            </StyledMenuItem>
          </StyledMenu>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
};

export default Header;
