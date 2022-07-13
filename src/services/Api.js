import axios from "axios";
import { toast } from "react-toastify";
// Configs
const configs = {
  baseURL: `${process.env.REACT_APP_URL_BASE}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  validateStatus: function (status) {
    return status >= 200 && status < 400;
  },
};

const handleError = (error) => {
  return Promise.reject(error);
};

// Fetch api type A: axios just with header config
const _axios = axios.create(configs);

// Fetch api type B: axios with authorization, header configs, ...
const api = axios.create(configs);

const getFromStore = () => {
  const user =JSON.parse(localStorage.getItem("user-chat"))?.user;
  return {
    token: user?.token ? `Bearer ${user.token}` : "",
  };
};

api.interceptors.request.use((config) => {
  const { token} = getFromStore();
  config.headers = { ...config.headers, authorization: token };
  return config;
}, handleError);

api.interceptors.response.use(
  (response) => {
    if (response?.status === 401) {
      // your failure logic
    }
    return response;
  },
  (error) => {
    showError(error);
    console.log("error", error);
    return Promise.reject(error); //when use showError, we dont need to write this line of code
  }
);

_axios.interceptors.response.use(
  (response) => {
    if (response.status === 401) {
      // your failure logic
    }
    return response;
  },
  (error) => {
    showError(error);
    console.log(error);
    return Promise.reject(error); //when use showError, we dont need to write this line of code
  }
);
export const showError = ({ response }) => {
  const messages = [];
  if (response?.status === 401) {
    toast.error("You are not authorized to access this page");
    console.log("response", response);

    return;
  }
  if (!response) {
    messages.push("Network error");
  } else {
    switch (response?.status) {
      case 422:
        let text = Object.values(response.data.errors);
        messages.push(...text);
        break;
      case 404:
        messages.push(response?.data?.message);

        break;
      case 409:
        messages.push(response?.data?.message);

        break;
      case 500:
        messages.push(response?.data?.message || "500 Server Error");
        break;
      default:
        messages.push(`Error ${response.status}`);
        break;
    }
  }
  messages.map((message) => toast.error(message));
};


export { _axios };
export default api;
