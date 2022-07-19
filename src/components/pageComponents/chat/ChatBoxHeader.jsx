import React from "react";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Typography } from "@mui/material";

const DivStyled = styled("div")(({ theme }) => ({
  width: "100%",
  backgroundColor: "#fff",
  padding: "0.5rem",
  display: "flex",
  alignItems: "center",
  gap: "1rem",
}));

const ChatBoxHeader = ({ chat }) => {
  return (
    <DivStyled>
      <Avatar
        src={chat.avatar}
        sx={{
          width: 65,
          height: 65,
        }}
      />
      <Box component={"div"} >
        <Typography variant="h5">{chat.userName}</Typography>
        <Typography
            variant="body"
            sx={{
              color: chat.status === "Online" ? "primary.green" : "primary.red",
            }}
          >
            {chat.status}
          </Typography>
      </Box>
    </DivStyled>
  );
};

export default ChatBoxHeader;
