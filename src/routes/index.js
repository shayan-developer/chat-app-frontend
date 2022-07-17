import useCtxValues from "context";
import MainLayout from "Layouts/Main.layot";
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { routes } from "./appRoutes"; // app routes

const MainRoutes = () => {
  const [state] = useCtxValues();
  const isAuth = state.isLogin;

  const gardRoute = (step) => {
    return routes.filter((route) => route.path.includes(step));
  };

  const authRouts = gardRoute("/auth");

  const chatRouts = gardRoute("/chat");

  console.log("state from ctx",state,isAuth);
  return (
    <MainLayout>
      <Routes>
        {authRouts.map((route) => (
          <Route
            {...route}
            element={isAuth ? <Navigate to="/chat" /> : route.element}
          />
        ))}
        {chatRouts.map((route) => (
          <Route
            {...route}
            element={isAuth ? route.element : <Navigate to="/auth/login" />}
          />
        ))}
        <Route path="*" element={() => <h1>404</h1>} />
        <Route path="/" element={<Navigate replace to={"/chat"} />} />
      </Routes>
    </MainLayout>
  );
};

export default MainRoutes;
