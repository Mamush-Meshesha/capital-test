import { Box, Button, Checkbox, Container, FormControlLabel, Grid2, TextField, Typography } from "@mui/material";
import { Link,  useNavigate } from "react-router-dom";
import Pizza from "../../components/Piza";
import BackGround from "../../components/auth/Background";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { adminLoginRequest } from "../../store/slice/adminSlice";

const AdminLogin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

    const handleLogin = (e) => {
        e.preventDefault()

        const data = {
            email,
            password
        }

        dispatch(adminLoginRequest(data))
    }
const isAdminLogin = useSelector((state) => state.admin.isAdminLogin);

useEffect(() => {
  if (isAdminLogin) {
    navigate("/admin"); 
  }
}, [isAdminLogin, navigate]);

    return (
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
              <TextField
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
              />
              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                variant="outlined"
              />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember Me"
              />
              <Button
                onClick={handleLogin}
                variant="contained"
                sx={{ hieght: "48px", background: "#ff9921" }}
              >
                Login
              </Button>
              <Typography>
                Don&apos;t have an account?{" "}
                <Link href="/register">Sign up</Link>
              </Typography>
            </Box>
          </Container>
        </Grid2>
      </Grid2>
    );
}

export default AdminLogin