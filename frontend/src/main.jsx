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
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import AdminHome from "./pages/admin/HomeA";
import AdminLayout from "./components/auth/AdminLayout.jsx";
import UserLayout from "./layouts/UserLayout.jsx";
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
import ManagerSignup from "./pages/admin/ManagerSignup.jsx";
import Profile from "./pages/admin/Profile.jsx";
import Settings from "./pages/admin/Settings.jsx";
import ProtectedRoute from "./components/auth/ProtectedRoute.jsx";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute.jsx";
import { AbilityProvider } from "./casl/AbilityContext.jsx";
import { useSelector } from "react-redux";
import PublicRoute from "./components/auth/PublicRoute.jsx";
import { AppThemeProvider } from "./theme/ThemeProvider.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Public Routes */}
      <Route index element={<Home />} />
      <Route
        path="login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />
      <Route
        path="register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route path="cart" element={<Cart />} />

      {/* User Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<UserLayout />}>
          {" "}
          {/* Wrap the user-specific layout */}
          <Route path="order" element={<Order />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="order-success" element={<OrderSuccess />} />
        </Route>
      </Route>

      {/* Admin Routes */}
      <Route element={<AdminProtectedRoute />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminHome />} /> {/* Admin Home */}
          <Route path="/admin/order" element={<UserDashBoard />} />
          <Route path="/admin/role" element={<Role />} />
          <Route path="/admin/users" element={<Customer />} />
          <Route path="/admin/manager" element={<Managers />} />
          <Route path="/admin/restaurant" element={<Restaurant />} />
          <Route path="/admin/profile" element={<Profile />} />
          <Route path="/admin/settings" element={<Settings />} />
          <Route path="/admin/manager/signup" element={<ManagerSignup />} />
        </Route>
      </Route>
    </Route>
  )
);

const Root = () => {
  // Use merged auth slice
  const auth = useSelector((state) => state?.auth);
  const role = (auth?.user?.role || "guest").toString().toLowerCase();

  return (
    <AppThemeProvider>
      <AbilityProvider role={role}>
        <RouterProvider router={router} />
      </AbilityProvider>
    </AppThemeProvider>
  );
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Root />
    </Provider>
  </StrictMode>
);
