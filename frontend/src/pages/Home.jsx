import { Box, TextField, Typography } from "@mui/material"
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Header from "../components/Header"

const Home = () => {

    return (
      <>
        <Box
          sx={{
            background: "#fff8f1",
            minHeight: "100vh",
            width: "100%",
            overflowX: "hidden",
            position: "relative",
          }}
        >
          <Header />

          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              minHeight: "60vh",
              flexDirection: "column",
              paddingX: "120px",
              width: "100vw",
              margin: "0 auto",
            }}
          >
            <Typography
              variant="h1"
              component="h2"
              sx={{
                background: "linear-gradient(to right, #ff890e, #ffbe71)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: "900",
                fontFamily: "revert",
                fontSize: "230px",
              }}
            >
              Order Us
            </Typography>
            <Typography variant="body1" width="50%" sx={{ fontSize: "34px" }}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              facere obcaecati neque at ea minima non, sequi tenetur eum
              sapiente nostrum magni quibusdam quisquam inventore
              necessitatibus! Ut id assumenda suscipit, quia dolore consequuntur
              non ducimus quo quaerat dignissimos, fuga doloremque corrupti qui
              aspernatur. Aut, cumque? Sint itaque natus quasi.
            </Typography>
            <Box sx={{ position: "relative", width: "50%" }}>
              <TextField
                placeholder="Search"
                type="search"
                variant="outlined"
                sx={{
                  borderRadius: "50px",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "50px",
                    paddingRight: 0,
                  },
                  "& .MuiInputBase-input": {
                    padding: "10px 16px",
                    height: "60px",
                  },
                  width: "100%",
                    background: "#fff",
                  fontSize: "40px"
                }}
              />
              <Box
                sx={{
                  borderRadius: "36px",
                  background: "#ff890f",
                  position: "absolute",
                  width: "72px",
                  height: "72px",
                  top: "4px",
                  right: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <SearchTwoToneIcon sx={{ color: "white", fontSize: "40px" }} />
              </Box>
            </Box>
          </Box>
          <Box sx={{ position: "absolute", right: "-340px", top: "22%" }}>
            <Box
              component="img"
              src="/side.png"
              sx={{ width: "700px", height: "700px", objectFit: "cover" }}
            />
          </Box>
        </Box>
      </>
    );
}

export default Home