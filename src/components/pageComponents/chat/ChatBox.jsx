import React from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { styled } from "@mui/material/styles";


const ChatBoxWrapper = styled("div")({
  height: "100%",
  display: "flex",
  flexDirection: "column",
})

const ChatBox = ({ chat }) => {
  return (
    <ChatBoxWrapper>
      <ChatBoxHeader chat={chat} />
      <ChatMessages/>
      <ChatInput chat={chat}/>
    </ChatBoxWrapper>
  );
};

export default ChatBox;
