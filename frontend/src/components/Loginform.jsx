/* eslint-disable react/prop-types */
import { Box, Container, Grid2, Typography } from "@mui/material"
import ReusableForm from "../utils/FormValidation";
import Pizza from "./Piza";
import BackGround from "./auth/Background";

const LoginForm = ({handleLogin}) => {

    return (
      <Box>
        <Grid2 container direction="row">
          <Grid2 size={6}>
            <BackGround />
          </Grid2>
          <Grid2 size={6} sx={{ background: "#fff" }}>
            <Container
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                height: "100vh",
                gap: "20px",
              }}
            >
              <Box sx={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <Pizza hieght={60} width={60} />
                <Typography variant="h3" sx={{ color: "#000" }}>
                  Pizza
                </Typography>
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "16px" }}
              >
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
}

export default LoginForm