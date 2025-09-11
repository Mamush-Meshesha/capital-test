import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../store/slice/authSlice";
import LoginForm from "../components/Loginform";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state?.auth);

  const handleLogin = (data) => {
    dispatch(loginStart(data));
  };

  useEffect(() => {
    if (auth?.isAuthenticated) {
      const role = (auth?.user?.role || "customer").toString().toLowerCase();
      if (role === "admin") navigate("/admin");
      else if (role === "manager") navigate("/admin/manager");
      else navigate("/");
    }
  }, [auth?.isAuthenticated, auth?.user?.role, navigate]);

  return (
    <Box>
      <LoginForm handleLogin={handleLogin} />
      <Footer />
    </Box>
  );
};

export default Login;
