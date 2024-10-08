import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store/index.js";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Order from "./pages/Order";
import AdminHome from "./pages/admin/HomeA";
import AdminLayout from "./components/auth/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
import AdminLogin from "./pages/admin/AdminLogin";
import UserDashBoard from "./pages/admin/User.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Role from "./pages/admin/Role.jsx";
import Customer from "./pages/admin/Customer.jsx";
import Managers from "./pages/admin/Manager.jsx";
import Restaurant from "./pages/admin/Restaurant.jsx";
import ManagerLogin from "./pages/admin/ManagerLogin.jsx";
import ManagerSignup from "./pages/admin/ManagerSignup.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="admin/login" element={<AdminLogin />} />
      <Route path="manager/login" element={<ManagerLogin />} />

      {/* User Routes */}
      <Route element={<UserLayout />}>
        {" "}
        {/* Wrap the user-specific layout */}
        <Route path="order" element={<Order />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} /> {/* Admin Home */}
        <Route path="/admin/order" element={<UserDashBoard />} />
        <Route path="/admin/role" element={<Role />} />
        <Route path="/admin/users" element={<Customer />} />
        <Route path="/admin/manager" element={<Managers />} />
        <Route path="/admin/restaurant" element={<Restaurant />} />
        <Route path="/admin/manager/signup" element={<ManagerSignup />} />
      </Route>
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
