import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid2,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import Pizza from "../components/Piza";
import BackGround from "../components/auth/Background";

const Register = () => {
  return (
    <>
      <Grid2 container direction="row" spacing={6}>
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
                Register
              </Typography>
              <TextField label="Email" type="email" variant="outlined" />
              <TextField label="Password" type="password" variant="outlined" />
              <TextField
                label="password-confirm"
                type="password"
                variant="outlined"
              />
              <TextField label="Location" type="text" variant="outlined" />
              <TextField label="Phone number" type="tel" variant="outlined" />
              <FormControlLabel
                control={<Checkbox color="primary" />}
                label="I accept  the term and conditions"
              />
              <Button
                variant="contained"
                sx={{ hieght: "48px", background: "#ff9921" }}
              >
                Register
              </Button>
              <Typography>
                Already have an account? <Link href="/">Login</Link>
              </Typography>
            </Box>
          </Container>
        </Grid2>
      </Grid2>
    </>
  );
};

export default Register;
