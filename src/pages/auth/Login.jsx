import { Form, MyFormHelperText } from "components/Form";
import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl } from "@mui/material";
import Button from "components/Button";
import { loginReq} from "services/auth.api";
import AuthLayout from "Layouts/Auth.layout";
import { useNavigate } from "react-router-dom";
import useCtxValues, { userTypes } from "context";
import { useSocket } from "context/socketCtx";
import useMediaQuery from '@mui/material/useMediaQuery';

const inputForms = [
  {
    name: "userName",
    label: "User Name",
    type: "text",
    key: "user_name",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
    key: "password",
  },
];

const Login = () => {
  const navigate = useNavigate();
  const [, dispatch] = useCtxValues();
  const socket = useSocket();
  const matches = useMediaQuery('(max-width:900px)');
  const onFinish = async (form) => {
    try {
      const data = await loginReq(form);
      dispatch({
        type: userTypes.Login,
        payload: data.user,
      });
      console.log(data);
      socket.emit("new-user", data.user.id);
      if (data.user.avatar) {
        navigate("/chat");
      } else {
        navigate("/chat/setAvatar");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <AuthLayout mode="Login">
      <Form onFinish={onFinish}>
        {(onChangeHand, errors, form) => {
          return (
            <>
              {inputForms.map((input) => (
                <FormControl sx={{ mt: 6, width: "100%" }} key={input.key}>
                  <TextField
                    {...input}
                    onChange={onChangeHand.bind(input.type, this)}
                    value={form[input.name]??""}
                    required
                    autoComplete="off"
                    error={!!errors[input.name]}
                    sx={{
                      "&  label": {
                        fontSize: "0.9rem !important",
                      },
                    }}
                    size={matches ? "small" : "large"}
                  />
                  <MyFormHelperText>
                    {errors[input.name] ? errors[input.name] : ""}
                  </MyFormHelperText>
                </FormControl>
              ))}
              <Button sx={{ mt: 10 }} size="large" type="submit">
                Login
              </Button>
            </>
          );
        }}
      </Form>
    </AuthLayout>
  );
};

export default Login;
