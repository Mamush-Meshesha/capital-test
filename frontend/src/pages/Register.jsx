import { Box, } from "@mui/material";
import { useDispatch } from "react-redux";
import { registerStart } from "../store/slice/userSlice";
import RegisterForm from "../components/RegisterForm";

const Register = () => {
  const dispatch = useDispatch();

  const handleSignup = (data) => {
    dispatch(registerStart(data));
  };

  return (
    <Box>
      <RegisterForm handleSignup={handleSignup} />
   </Box>
  );
};

export default Register;
