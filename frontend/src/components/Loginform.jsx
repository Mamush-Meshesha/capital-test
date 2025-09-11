/* eslint-disable react/prop-types */
import {
  Box,
  Container,
  Grid2,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import ReusableForm from "../utils/FormValidation";
import Pizza from "./Piza";
import BackGround from "./auth/Background";
import { Link } from "react-router-dom";

import { useState } from "react";

const LoginForm = ({ handleLogin }) => {
  const [role, setRole] = useState("customer");
  return (
    <Box>
      <Grid2 container direction="row">
        <Grid2
          size={6}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "block",
            },
          }}
        >
          <BackGround />
        </Grid2>

        <Grid2
          size={6}
          sx={{
            background: "#fff",
            width: {
              xs: "100%",
              sm: "100%",
              md: "50%",
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
              <Typography variant="body1" sx={{ color: "#000" }}>
                <Link to="/admin/login">Admin ?</Link>
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
              <FormControl fullWidth size="small">
                <InputLabel id="role-select-label">Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  label="Role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <MenuItem value="customer">Customer</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="manager">Manager</MenuItem>
                </Select>
              </FormControl>
              <ReusableForm
                fields={["email", "password"]}
                onSubmit={(data) => handleLogin({ ...data, role })}
                submitButtonText="Login"
                formType="login"
              />
              <Typography variant="body2" sx={{ mt: 1 }}>
                Don\'t have an account? <Link to="/register">Register</Link>
              </Typography>
            </Box>
          </Container>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default LoginForm;
