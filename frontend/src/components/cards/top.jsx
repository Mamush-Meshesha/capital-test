/* eslint-disable react/prop-types */
import { Box, Grid2, Typography } from "@mui/material"

const TopCard = ({topRestaurants}) => {
console.log(topRestaurants)
    return (
      <Box>
        {topRestaurants.map((res, index) => (
            <Grid2 key={index}
            container
            spacing={6}
            alignItems="center"
            height="200px"
            display="flex"
            width="100%"
          >
            <Grid2 size={6}>
              <Box display="flex" gap="10px">
                <Box
                  component="img"
                  src="/pro.jpg"
                  sx={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "40px",
                    objectPosition: "contained",
                  }}
                />
                <Typography variant="h4" fontWeight="400">
                  {res.name}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body1" >
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae,
                  cupiditate.
                </Typography>
              </Box>
            </Grid2>
            {/* side orders number */}
            <Grid2 size={6} alignItems="center" display="flex">
              <Box display="flex" gap="10px" paddingY="10px">
                <Box
                  height="100"
                  width="100%"
                  alignItems="center"
                  borderRadius={4}
                  sx={{ background: "#f2f9f2" }}
                >
                  <Box display="flex" gap={5} padding="10px">
                    <Box
                      component="img"
                      src="/order.png"
                      sx={{ width: "100px", height: "100px" }}
                    />
                    <Box>
                      <Typography variant="body1">Number of Orders</Typography>
                      <Typography variant="h2">100k</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid2>
          </Grid2>
        ))}
      </Box>
    );
}

export default TopCard