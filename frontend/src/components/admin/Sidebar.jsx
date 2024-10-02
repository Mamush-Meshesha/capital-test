import  { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { MdMenuOpen } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiInbox2Line } from "react-icons/ri";
import { CiPizza } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import Pizza from "../Piza";
import { CiLogin } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { adminlogoutRequest } from "../../store/slice/adminSlice";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { MdOutlineTableRestaurant } from "react-icons/md";
import { FcManager } from "react-icons/fc";
import { useTheme } from "@mui/material/styles";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(adminlogoutRequest());
    navigate("/admin/login");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const sidebarItems = [
    { name: "Orders", icon: RiInbox2Line, path: "/admin/order" },
    { name: "Add Menu", icon: CiPizza, path: "/admin" },
    { name: "Role", icon: CiUser, path: "/admin/role" },
    { name: "Users", icon: FaRegCircleUser, path: "/admin/users" },
    { name: "Managers", icon: FcManager, path: "/admin/manager" },
    {
      name: "Restaurants",
      icon: MdOutlineTableRestaurant,
      path: "/admin/restaurant",
    },
  ];

  const drawerContent = (
    <Box overflow="hidden">
      <Box sx={{ width: 240 }}>
        <AppBar
          position="static"
          sx={{
            bgcolor: "#fff",
            color: "white",
            padding: 2,
            boxShadow: 1,
          }}
        >
          <Box color="#f44" display="flex" justifyContent="space-between">
            <Typography variant="h5">Pizza</Typography>
            <MdMenuOpen style={{ fontSize: "24px" }} />
          </Box>
        </AppBar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            paddingY: "20px",
            background: "#fff8f2",
            mt: 0.1,
          }}
        >
          <Pizza width={70} height={70} />
        </Box>
        <List
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "13px",
            borderBottom: "2px solid #ececec",
            paddingBottom: "25px",
            justifyContent: "center",
          }}
        >
          {sidebarItems.map((item) => (
            <ListItem button key={item.name} sx={{ fontSize: "20px" }}>
              <item.icon
                style={{
                  fontSize: "26px",
                  color: "#575757",
                  paddingRight: "7px",
                }}
              />
              <Link
                to={item.path}
                state={{ pageName: item.name }}
                style={{ textDecoration: "none", color: "#575757" }}
              >
                {item.name}
              </Link>
            </ListItem>
          ))}
        </List>
        <Button
          onClick={handleLogOut}
          sx={{
            fontSize: "20px",
            paddingY: "25px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CiLogin
            style={{
              color: "red",
              fontWeight: "bolder",
              paddingRight: "7px",
            }}
          />
          Log Out
        </Button>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      {isMobile ? (
        <>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            edge="start"
            sx={{ ml: 2 }}
          >
            <MdMenuOpen />
          </IconButton>
          <Drawer
            variant="temporary"
            open={isDrawerOpen}
            onClose={toggleDrawer}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: 240,
              },
            }}
          >
            {drawerContent}
          </Drawer>
        </>
      ) : (
        <Drawer
          variant="permanent"
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#ffffff", boxShadow: 1 }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: "#575757" }}
            >
              {location.state?.pageName || "Dashboard"}
            </Typography>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "30px",
                  color: "#575757",
                }}
              >
                <IoNotificationsOutline style={{ fontSize: "30px" }} />
                <CgProfile style={{ fontSize: "30px" }} />
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
        <Box mt={0.2} bgcolor="#f2f2f2" sx={{ height: "93vh" }}>
          <Box padding="20px">
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
