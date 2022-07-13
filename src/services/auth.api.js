import { _axios } from "./Api";

export const registerReq = (data) => {
  return _axios.post("/auth/register", data).then((res) => res.data);
};

export const loginReq = (data) =>
  _axios.post("/auth/login",data).then((res) => res.data);
