import { io } from "socket.io-client";
import React from "react";

const socket = io.connect(process.env.REACT_APP_URL_BASE);

const SocketContext = React.createContext(socket);

const useSocket = () => {
  const context = React.useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

const SocketProvider = ({ children }) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider, useSocket };
