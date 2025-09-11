import { useMemo, useState } from "react";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  Avatar,
  Badge,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {
  MdMenuOpen,
  MdOutlineChevronLeft,
  MdOutlineChevronRight,
} from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import { IoFilterOutline } from "react-icons/io5";
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogOut = (e) => {
    e.preventDefault();
    dispatch(adminlogoutRequest());
    navigate("/admin/login");
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  const openProfileMenu = (event) => setProfileMenuAnchor(event.currentTarget);
  const closeProfileMenu = () => setProfileMenuAnchor(null);

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
    { name: "Profile", icon: CgProfile, path: "/admin/profile" },
    { name: "Settings", icon: IoNotificationsOutline, path: "/admin/settings" },
  ];

  const activePath = location.pathname;

  const drawerContent = (
    <Box
      overflow="hidden"
      sx={{
        width: isCollapsed ? 80 : 260,
        transition: "width 240ms cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <Box sx={{ width: "100%" }}>
        <Box
          sx={{
            bgcolor: "#0f172a",
            color: "#e2e8f0",
            px: 2,
            py: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: isCollapsed ? "center" : "space-between",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
                bgcolor: "#1e293b",
                borderRadius: 1,
              }}
            >
              <Pizza width={26} height={26} />
            </Box>
            {!isCollapsed && (
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, letterSpacing: 0.3 }}
              >
                Pizza Admin
              </Typography>
            )}
          </Box>
          <IconButton
            size="small"
            onClick={toggleCollapse}
            sx={{ color: "#94a3b8" }}
          >
            {isCollapsed ? <MdOutlineChevronRight /> : <MdOutlineChevronLeft />}
          </IconButton>
        </Box>

        <List sx={{ py: 1 }}>
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath.startsWith(item.path);
            return (
              <ListItem key={item.name} disablePadding>
                <Tooltip title={isCollapsed ? item.name : ""} placement="right">
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    state={{ pageName: item.name }}
                    sx={{
                      gap: 1.5,
                      px: isCollapsed ? 1.4 : 2,
                      py: 1.1,
                      borderRadius: 1,
                      mx: 1,
                      mb: 0.5,
                      color: (theme) =>
                        isActive
                          ? theme.palette.text.primary
                          : theme.palette.text.secondary,
                      backgroundColor: (theme) =>
                        isActive
                          ? theme.palette.action.selected
                          : "transparent",
                      "&:hover": (theme) => ({
                        backgroundColor: isActive
                          ? theme.palette.action.selected
                          : theme.palette.action.hover,
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: isCollapsed ? 0 : 1.25,
                        color: "inherit",
                      }}
                    >
                      <Icon size={22} />
                    </ListItemIcon>
                    {!isCollapsed && (
                      <ListItemText
                        primaryTypographyProps={{
                          fontSize: 14,
                          fontWeight: 600,
                        }}
                        primary={item.name}
                      />
                    )}
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>

        <Divider sx={{ my: 1.5 }} />

        <Box sx={{ px: isCollapsed ? 1 : 2, pb: 2 }}>
          <Button
            fullWidth={!isCollapsed}
            onClick={handleLogOut}
            variant="outlined"
            color="error"
            sx={{
              justifyContent: isCollapsed ? "center" : "flex-start",
              gap: 1,
              px: isCollapsed ? 0 : 2,
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            <CiLogin />
            {!isCollapsed && "Log out"}
          </Button>
        </Box>
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
            sx={{ ml: 1, mt: 1, zIndex: 100, top: "0px", position: "absolute" }}
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
                width: 280,
                transition: "transform 280ms cubic-bezier(0.4, 0, 0.2, 1)",
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
            width: isCollapsed ? 80 : 260,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: isCollapsed ? 80 : 260,
              boxSizing: "border-box",
              transition: "width 240ms cubic-bezier(0.4, 0, 0.2, 1)",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent}
        </Drawer>
      )}
      <Box
        component="main"
        sx={{ flexGrow: 1, overflow: "hidden", minWidth: 0 }}
      >
        <AppBar
          position="sticky"
          sx={{
            background: (theme) => theme.palette.background.paper,
            boxShadow: "0 1px 0 rgba(15,23,42,0.06)",
            px: 2,
            borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            top: 0,
            zIndex: (theme) => theme.zIndex.drawer + 1,
            width: {
              xs: "100%",
            },
          }}
        >
          <Toolbar sx={{ gap: 2 }}>
            {isMobile && (
              <IconButton onClick={toggleDrawer} sx={{ color: "#0f172a" }}>
                <MdMenuOpen />
              </IconButton>
            )}
            <Typography
              variant="h5"
              component="div"
              sx={{ color: "#0f172a", fontWeight: 700, mr: 1 }}
            >
              {location.state?.pageName || "Dashboard"}
            </Typography>

            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                flex: 1,
                maxWidth: 560,
                bgcolor: (theme) => theme.palette.action.hover,
                border: (theme) => `1px solid ${theme.palette.divider}`,
                borderRadius: 2,
                px: 1.25,
                py: 0.5,
                gap: 1,
              }}
            >
              <IoSearchOutline size={18} color="#64748b" />
              <InputBase placeholder="Search…" sx={{ flex: 1, fontSize: 14 }} />
              <IconButton size="small" sx={{ color: "#64748b" }}>
                <IoFilterOutline />
              </IconButton>
            </Box>

            <Box
              sx={{
                ml: "auto",
                display: "flex",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              <IconButton
                sx={{ color: (theme) => theme.palette.text.secondary }}
              >
                <Badge color="error" variant="dot" overlap="circular">
                  <IoNotificationsOutline style={{ fontSize: "22px" }} />
                </Badge>
              </IconButton>

              <Tooltip title="Account">
                <IconButton onClick={openProfileMenu} size="small">
                  <Avatar
                    sx={{
                      width: 32,
                      height: 32,
                      bgcolor: (theme) => theme.palette.primary.main,
                      color: (theme) =>
                        theme.palette.getContrastText(
                          theme.palette.primary.main
                        ),
                      border: (theme) => `1px solid ${theme.palette.divider}`,
                    }}
                  >
                    A
                  </Avatar>
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={profileMenuAnchor}
                open={Boolean(profileMenuAnchor)}
                onClose={closeProfileMenu}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
              >
                <MenuItem
                  component={Link}
                  to="/admin/profile"
                  onClick={closeProfileMenu}
                >
                  Profile
                </MenuItem>
                <MenuItem
                  component={Link}
                  to="/admin/settings"
                  onClick={closeProfileMenu}
                >
                  Settings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeProfileMenu();
                    handleLogOut(new Event("click"));
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
        <Box
          mt={0.2}
          sx={{
            height: "93vh",
            overflowX: "hidden",
            bgcolor: (theme) => theme.palette.background.default,
          }}
        >
          <Box padding="20px" sx={{ width: "100%", overflowX: "hidden" }}>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
