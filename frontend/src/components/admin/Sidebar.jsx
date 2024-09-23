import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  Toolbar,
  Typography,
} from "@mui/material";
import { MdMenuOpen } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { RiInbox2Line } from "react-icons/ri";
import { CiPizza } from "react-icons/ci";
import { CiUser } from "react-icons/ci";
import { FaRegCircleUser } from "react-icons/fa6";
import { MaterialReactTable } from "material-react-table";



import Pizza from "../Piza";
import AddRecipe from "./add";

const Sidebar = () => {
   const columns = [
     { accessorKey: "name", header: "Name" },
     { accessorKey: "Topping", header: "Topping" },
     { accessorKey: "quantity", header: "Quantity" },
     { accessorKey: "phone", header: "Phone number" },
     { accessorKey: "time", header: "Created_at" },
     { accessorKey: "status", header: "Status" },
   ];

   const data = [
     {
       name: "Pizza",
       Topping: "Pepperoni",
       quantity: 2,
       phone: "0938301620",
       time: "2024-09-20 12:45:00",
       status: "Delivered",
     },
     {
       name: "Burger",
       Topping: "Mushroom",
       quantity: 1,
       phone: "0938301621",
       time: "2024-09-20 13:00:00",
       status: "Pending",
     },
     {
       name: "Lazagna",
       Topping: "Cheese",
       quantity: 3,
       phone: "0938301622",
       time: "2024-09-20 13:30:00",
       status: "Cancelled",
     },
     {
       name: "Shiro",
       Topping: "Olives",
       quantity: 1,
       phone: "0938301623",
       time: "2024-09-20 14:00:00",
       status: "Preparing",
     },
     {
       name: "Atikilt",
       Topping: "Sausage",
       quantity: 2,
       phone: "0938301624",
       time: "2024-09-20 14:15:00",
       status: "Delivered",
     },
   ];

  return (
    <Box sx={{ display: "flex" }}>
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
          <Pizza width={70} hieght={70} />
        </Box>
        <List sx={{display: "flex", flexDirection: "column", gap: "13px"}}>
          {/* {["Order", "Add Menu", "Role", "User"].map((text) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))} */}
          <ListItem button sx={{ fontSize: "20px" }}>
            <RiInbox2Line
              style={{
                fontSize: "26px",
                color: "#575757",
                paddingRight: "7px",
              }}
            />
            Orders
          </ListItem>
          <ListItem button sx={{ fontSize: "20px" }}>
            <CiPizza
              style={{
                fontSize: "26px",
                color: "#575757",
                paddingRight: "7px",
              }}
            />
            Add Menu
          </ListItem>
          <ListItem button sx={{ fontSize: "20px" }}>
            <CiUser
              style={{
                fontSize: "26px",
                color: "#575757",
                paddingRight: "7px",
              }}
            />
            Role
          </ListItem>
          <ListItem button sx={{ fontSize: "20px" }}>
            <FaRegCircleUser
              style={{
                fontSize: "26px",
                color: "#575757",
                paddingRight: "7px",
              }}
            />
            Users
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ background: "#ffffff", boxShadow: 1 }}>
          <Toolbar>
            <Typography
              variant="h5"
              component="div"
              sx={{ flexGrow: 1, color: "#575757" }}
            >
              Order
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
        {/* meain area */}
              <Box mt={0.2} bgcolor="#f9f9f9" sx={{ height: "93vh" }}>
                  <Box padding="20px">
                      {/* matrial react table test */}
                      {/* <MaterialReactTable  columns={columns} data={data}  /> */}
                      <AddRecipe />
                  </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Sidebar;
