import { CircularProgress } from "@mui/material";
import { Login, Register } from "pages/auth";
import { Chat, SetAvatar } from "pages/chat";
import React from "react";
const RightSide = React.lazy(() =>
  import("components/pageComponents/chat/RightSide")
);

/* ----------------------- help (Structure of Routes) ----------------------- */
// {
//     key: "path",
//     path :"name of path",
//     component: "name of component",
//     exact: true,
//     routes: []
// }

/* ----------------------------------- end ---------------------------------- */

export const routes = [
  {
    path: "/auth/register",
    element: <Register />,
    key: "register",
  },
  {
    path: "/auth/login",
    element: <Login />,
    key: "login",
  },

  {
    path: "/chat",
    element: <Chat />,
    key: "chat",
  },
  {
    path: "/chat/setAvatar",
    element: <SetAvatar />,
    key: "setAvatar",
  },
  {
    path: "/chat/mobileVer",
    element: (
      <React.Suspense fallback={<CircularProgress/>}>
        <RightSide />
      </React.Suspense>
    ),
    key: "mobile",
  },
];
