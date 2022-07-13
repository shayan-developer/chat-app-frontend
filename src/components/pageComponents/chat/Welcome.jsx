import React from "react";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import robotAnimation from "animation/robot.json";
import { Typography } from "@mui/material";
import Lottie from "lottie-react";


const Container = styled("div")(({ theme }) => ({
  width: '100%',
  height: '100%',
  ...theme.centerCol,
}));

const Welcome = ({ user }) => {
  return (
    <Container>
      <Lottie animationData={robotAnimation} loop={true} />
      <Typography variant="h4" sx={{color:"#fff"}}>Welcome ,  {user.userName} !</Typography>
      <Typography variant="h5" sx={{color:"#fff"}}>
        Please select a contact to start chatting
      </Typography>
    </Container>
  );
};

export default Welcome;
