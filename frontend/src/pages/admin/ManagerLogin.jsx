import { Box } from "@mui/material";
import LoginForm from "../../components/Loginform";
import Footer from "../../components/Footer";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ManagerLogin = () => {
  const navigate = useNavigate();
  const isManagerLogin = useSelector((state) => state.manager.isManagerLogin);

  useEffect(() => {
    if (isManagerLogin) {
      navigate("/admin/manager");
    }
  }, [isManagerLogin, navigate]);

  return (
    <Box>
      <LoginForm />
      <Footer />
    </Box>
  );
};

export default ManagerLogin;
