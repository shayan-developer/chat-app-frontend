import { Form, MyFormHelperText } from "components/Form";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Button from "components/Button";
import { registerReq } from "services/auth.api";
import AuthLayout from "Layouts/Auth.layout";
import { useNavigate } from "react-router-dom";

const inputForms = [
  {
    name: "userName",
    label: "User Name",
    type: "text",
    key: "user_name",
  },
  {
    name: "email",
    label: "Email",
    type: "email",
    key: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    key: "password",
  },
  {
    name: "password_confirmation",
    label: "Password Confirmation",
    type: "password",
    key: "password_confirmation",
  },
];

const Register = () => {
  const navigate = useNavigate();

  const onFinish = async (form) => {
    try {
      const data = await registerReq(form);
      navigate("/chat/setAvatar");
    } catch (error) {
      console.log(error);
    }
    console.log(form);
  };
  return (
    <AuthLayout mode={"Sign up"}>
      <Form onFinish={onFinish}>
        {(onChangeHand, errors, form) => {
          return (
            <>
              {inputForms.map((input) => (
                <FormControl sx={{ mt: 4, width: "100%" }} key={input.key}>
                  <TextField
                    {...input}
                    onChange={onChangeHand.bind(input.type, this)}
                    value={form[input.name]}
                    required
                    autoComplete="off"
                    error={!!errors[input.name]}
                    sx={{
                      "&  label": {
                        fontSize: "0.9rem !important",
                      },
                    }}
                  />
                  <MyFormHelperText>
                    {errors[input.name] ? errors[input.name] : ""}
                  </MyFormHelperText>
                </FormControl>
              ))}
              <Button sx={{ mt: 10 }} size="large" type="submit">
                Register
              </Button>
            </>
          );
        }}
      </Form>
    </AuthLayout>
  );
};

export default Register;
