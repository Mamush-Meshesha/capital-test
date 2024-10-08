/* eslint-disable react/prop-types */
import { Box, Container, Grid2, Typography } from "@mui/material";
import ReusableForm from "../utils/FormValidation";
import Pizza from "./Piza";
import BackGround from "./auth/Background";

const LoginForm = ({ handleLogin }) => {
  return (
    <Box>
      <Grid2 container direction="row">
        {/* First grid: Takes 6 on large screens, hidden on small */}
        <Grid2
          size={6} // For larger devices
          sx={{
            display: {
              xs: "none", // Hide on extra small and small devices
              sm: "none",
              md: "block", // Display from medium onwards
            },
          }}
        >
          <BackGround />
        </Grid2>

        {/* Second grid: Full width (size 12) on small devices */}
        <Grid2
          size={6} // Use size={6} for large screens
          sx={{
            background: "#fff",
            width: {
              xs: "100%", // Full width on extra small devices
              sm: "100%", // Full width on small devices
              md: "50%", // Half width on medium devices
            },
          }}
        >
          <Container
            maxWidth="xs"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              height: "100vh",
              gap: "20px",
            }}
          >
            <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <Pizza height={60} width={60} />
              <Typography variant="h3" sx={{ color: "#000" }}>
                Pizza
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <Typography
                variant="h4"
                sx={{
                  borderBottom: "2px solid #eee",
                  paddingBottom: "8px",
                }}
              >
                Login
              </Typography>
              <ReusableForm
                fields={["email", "password"]}
                onSubmit={handleLogin}
                submitButtonText="Login"
                formType="login"
              />
            </Box>
          </Container>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default LoginForm;
