import { Login, Register } from "pages/auth";
import { Chat,SetAvatar  } from "pages/chat";


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
];
