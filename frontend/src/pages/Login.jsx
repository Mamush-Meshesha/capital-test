import {
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { loginStart } from "../store/slice/userSlice";
import LoginForm from "../components/Loginform";

const Login = () => {
  const dispatch = useDispatch();

  const handleLogin = (data) => {
    dispatch(loginStart(data));
  };

  return (
    <Box>
      <LoginForm handleLogin={handleLogin} />
    </Box>
  );
};

export default Login;
