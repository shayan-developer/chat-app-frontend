import React from "react";
import { styled } from "@mui/material/styles";

const GlassesDiv = styled("div", {
  shouldForwardProp: (prop) => prop !== "fullView",
})(({ theme, fullView }) => {
  return {
    background: "rgba(255, 255, 255, 0.3)",
    backdropFilter: "blur(10px)",
    height: fullView ? "100%" : "75%",
    width: fullView ? "100%" : "75%",
    borderRadius: ".5rem",
    overflow: "hidden",
    '@media (max-width:900px)': {
      width: "100%",
      height: "100%",

    },
  };
});

const GlassBox = ({ children, fullView = false }) => {
  return <GlassesDiv fullView={fullView}>{children}</GlassesDiv>;
};

export default GlassBox;
