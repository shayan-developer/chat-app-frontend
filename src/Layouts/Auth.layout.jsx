import React from "react";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import Lottie from "lottie-react";
import robotAnimation from "animation/robot.json";
import { Link } from "react-router-dom";
import GlassBox from "components/GlassBox";

// const AuthStyles = styled("div")(
//   sx((theme) => ({
//     height: "100%",
//     width: 1,
//     ...theme.centerCol,
//     gap: "1rem",
//   }))
// );



const AuthLayout = ({ children, mode }) => {
  const path = mode === "Login" ? "/auth/register" : "/auth/login";
  const whereToGo = mode === "Login" ? "Register" : "Login";
  const text =
    mode === "Login" ? "Have not account yet ?" : "  Already have an account ?";

  const textForCaption = (
    <Box component={"p"} sx={{mt:2}}>
      {text} <Link to={path}>{whereToGo} here</Link>
    </Box>
  );

  return (
    // <AuthStyles>
      <GlassBox>
        <Grid height={"100%"} container spacing={0}>
          <Grid item xs={6}>
            <Box component={"div"} sx={(t) => ({ ...t.centerCol, height: 1 })}>
              <Lottie animationData={robotAnimation} loop={true} />
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box
              component={"div"}
              sx={(t) => ({
                ...t.centerCol,
                height: 1,
                p: 5,
                backgroundColor: "#fff",
              })}
            >
              <Typography variant="h3">
                {mode === "Login" ? "Login" : "Sign up"}
              </Typography>
              {children}
              {textForCaption}
            </Box>
          </Grid>
        </Grid>
      </GlassBox>
    // </AuthStyles>
  );
};

export default AuthLayout;
