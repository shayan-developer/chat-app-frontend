import React from "react";
import { styled, experimental_sx as sx } from "@mui/material/styles";

const ChatMessagesWrapper = styled("div")({
  height: "100%",
});

const ChatMessages = () => {
  return <ChatMessagesWrapper>ChatMessages</ChatMessagesWrapper>;
};

export default ChatMessages;
