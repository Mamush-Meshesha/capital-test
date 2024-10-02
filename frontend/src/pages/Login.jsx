import {
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loginStart } from "../store/slice/userSlice";
import LoginForm from "../components/Loginform";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate =useNavigate()

  const handleLogin = (data) => {
    dispatch(loginStart(data));
    navigate("/")
  };

   const isUserLogin = useSelector((state) => state.customer.isUserLogin);

   useEffect(() => {
     if (isUserLogin) {
       navigate("/");
     }
   }, [isUserLogin, navigate]);

  return (
    <Box>
      <LoginForm handleLogin={handleLogin} />
    </Box>
  );
};

export default Login;
