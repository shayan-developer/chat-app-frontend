import React from "react";
import { Button as Btn } from "@mui/material";
import { styled, experimental_sx as sx } from "@mui/material/styles";

const ButtonStyled = styled(Btn)(
    sx({
        width:1
    })
)

const Button = ({ children ,...rest }) => {
  return (
    <ButtonStyled  variant="contained" {...rest} >
      {children}
    </ButtonStyled>
  );
};

export default Button;
