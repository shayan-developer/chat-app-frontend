import React, { useEffect, useState } from "react";
import ChatBoxHeader from "./ChatBoxHeader";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import { styled, experimental_sx as sx } from "@mui/material/styles";


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
      <ChatInput />
    </ChatBoxWrapper>
  );
};

export default ChatBox;
