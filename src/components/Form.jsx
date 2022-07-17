import React from "react";
import { validateAndSet } from "utils";
import { FormHelperText } from "@mui/material";

const Form = ({ children, onFinish,...rest }) => {
  const [form, setForm] = React.useState({});
  const [errors, setErrors] = React.useState({});
 
  const onFinishHand = (e) => {
    e.preventDefault();
    onFinish(form);
  };

  const onChangeHand = (type,event) => {
    validateAndSet(setForm, setErrors, type, form,event);
  };

  return (
    <form autoComplete="off" onSubmit={onFinishHand} {...rest}>{children(onChangeHand, errors, form)}</form>
  );
};

function MyFormHelperText({ children}) {
  
    return <FormHelperText sx={{ color: "#EB568C", m: 0 }}>{children}</FormHelperText>;
  }

export { Form ,MyFormHelperText};
