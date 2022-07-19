import React from "react";
import { styled } from "@mui/material/styles";
import robotAnimation from "animation/robot.json";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";

const Container = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100%",
  ...theme.centerCol,
}));

const Welcome = ({ user }) => {

  return (
    <Container>
      <Box sx={{ width: "50%" }}>
        <Lottie animationData={robotAnimation} loop={true} />
      </Box>
      <Typography variant="h4" sx={{ color: "primary.main" }}>
        Welcome , {user.userName} !
      </Typography>
      <Typography variant="h5" sx={{ color: "#fff" }}>
        Please select a contact to start chatting
      </Typography>
    </Container>
  );
};

export default React.memo(Welcome) ;
