/* eslint-disable react/prop-types */
import { Box, Container, Grid2, Typography } from "@mui/material";
import ReusableForm from "../utils/FormValidation";
import Pizza from "./Piza";
import BackGround from "./auth/Background";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";

const RegisterForm = ({ handleSignup }) => {
  const [role, setRole] = useState("CUSTOMER");
  return (
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Typography
              variant="h4"
              sx={{
                borderBottom: "2px solid #eee",
                paddingBottom: "8px",
              }}
            >
              Register
            </Typography>
            <ReusableForm
              fields={[
                "name",
                "email",
                "password",
                "passwordConfirm",
                "location",
                "phone_number",
              ]}
              onSubmit={(data) => handleSignup({ ...data, role })}
              submitButtonText="Register"
              formType="register"
            />
            <FormControl fullWidth size="small" sx={{ mt: 1 }}>
              <InputLabel id="role-select-label">Role</InputLabel>
              <Select
                labelId="role-select-label"
                id="role-select"
                label="Role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <MenuItem value="CUSTOMER">Customer</MenuItem>
                <MenuItem value="ADMIN">Admin</MenuItem>
                <MenuItem value="MANAGER">Manager</MenuItem>
              </Select>
            </FormControl>
            <Typography variant="body2" sx={{ mt: 1 }}>
              Already have an account? <Link to="/login">Login</Link>
            </Typography>
          </Box>
        </Container>
      </Grid2>
    </Grid2>
  );
};

export default RegisterForm;
