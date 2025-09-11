import { Box } from "@mui/material";
import CardCom from "../components/cards/card";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { orderHistoryRequest } from "../store/slice/userSlice";

const History = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistoryRequest());
  }, [dispatch]);
  return (
    <Box>
      <h1>order history</h1>
      <Box>
        <CardCom />
      </Box>
      <Footer />
    </Box>
  );
};

export default History;
