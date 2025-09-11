/* eslint-disable react/prop-types */
import { Box, Container, Paper } from "@mui/material";

const Items = ({ item }) => {
  const gradient = `linear-gradient(45deg, ${item.colors.join(", ")})`;

  return (
    <>
      <Paper
        sx={{
          height: "500px",
          borderRadius: "70px",
          display: "flex",
          alignItems: "center",
          background: gradient,
        }}
      >
        <Container>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
        </Container>
        <Box component="img" src="/one.png" />
      </Paper>
    </>
  );
};

export default Items;
