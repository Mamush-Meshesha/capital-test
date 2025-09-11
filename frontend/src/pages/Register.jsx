import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { registerStart } from "../store/slice/userSlice";
import RegisterForm from "../components/RegisterForm";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const registeredUser = useSelector((state) => state.customer.registeredUser);

  const handleSignup = (data) => {
    dispatch(registerStart(data));
  };

  useEffect(() => {
    if (registeredUser && registeredUser.email) {
      navigate("/login");
    }
  }, [registeredUser, navigate]);

  return (
    <Box>
      <RegisterForm handleSignup={handleSignup} />
      <Footer />
    </Box>
  );
};

export default Register;
