import { Box, Button, Checkbox, Container, FormControlLabel, Grid2,Link,TextField,Typography } from "@mui/material"
import BackGround from "../components/auth/Background"
import Pizza from "../components/Piza";

const Login = () => {

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
              <TextField label="Email" type="email" variant="outlined" />
              <TextField label="Password" type="password" variant="outlined" />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="Remember Me"
              />
              <Button
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

export default Login