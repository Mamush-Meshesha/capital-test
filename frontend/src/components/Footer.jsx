import { Box, Link, List, TextField, Typography } from "@mui/material";
import Pizza from "./Piza";
import { BsFacebook, BsLinkedin, BsTwitterX, BsYoutube } from "react-icons/bs";

const Footer = () => {
  return (
    <Box overflow="hidden">
      <Box
        sx={{
          background: "#ccb691",
          width: "100%", // Ensures full width
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: "95%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",

            "@media (min-width: 600px)": {
              maxWidth: "85%",
            },
            "@media (min-width: 960px)": {
              maxWidth: "80%",
            },
            "@media (min-width: 1280px)": {
              maxWidth: "90%",
            },
          }}
        >
          <List
            sx={{
              fontSize: "40px",
              display: "flex",
              justifyContent: "space-between",
              width: "40%",
            }}
          >
            <Link href="/">Home</Link>
            <Link href="/">Order</Link>
            <Link href="/">About Us</Link>
          </List>
          <Box gap="15px" display="flex" flexDirection="column">
            <Pizza width={60} height={60} name={"pizza"} />
            <TextField
              type="text"
              placeholder="Your feedback ..."
              sx={{ background: "#fff", borderRadius: "16px" }}
            />
          </Box>
        </Box>
        <Box sx={{ background: "#000", padding: "40px" }}>
          <Box display="flex" justifyContent="space-between">
            <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
              <Typography color="#fff">
                &copy; {new Date().getFullYear()} Pizza All Right Reserved.
              </Typography>
              <Typography color="#fff">Terms & Conditions</Typography>
            </Box>
            <Box>
              <Box
                display="flex"
                              color="#fff"
                              gap="30px"
              >
                <Link>
                  <BsFacebook />
                </Link>
                <Link>
                  <BsLinkedin />
                </Link>
                <Link>
                  <BsTwitterX />
                </Link>
                <Link>
                  <BsYoutube />
                </Link>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
