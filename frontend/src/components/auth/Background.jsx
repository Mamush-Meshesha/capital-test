import Pizza from "../Piza";
import { Box } from "@mui/material";
const BackGround = () => {
  return (
    <Box
      sx={{
        background: "#ff9921",
        width: "100%",
        minHeight: "100vh",
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Pizza hieght={350} width={350} />
    </Box>
  );
};

export default BackGround;
