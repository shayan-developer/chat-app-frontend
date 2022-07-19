import React, { useEffect, useLayoutEffect, useRef } from "react";
import { styled} from "@mui/material/styles";
import { useSocket } from "context/socketCtx";
import { Divider } from "@mui/material";
import useCtxValues from "context";

const ChatMessagesWrapper = styled("div")(({ theme }) => {
  return {
    height: "100%",
    padding: "1rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflowY: "auto",
    gap: "1rem",
    "&::-webkit-scrollbar": {
      width: "0.5rem",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#ccc",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "0.25rem",
    },
  };
});

const MessageItem = styled("div", {
  shouldForwardProp: (prop) => !["fromMe"].includes(prop),
})(({ theme, fromMe }) => ({
  backgroundColor: fromMe ? theme.palette.primary.main : "#fff",
  color: fromMe ? "#fff" : "#000",
  padding: "0.5rem",
  borderRadius: "0.5rem",
  alignSelf: fromMe ? "flex-end" : "flex-start",
  maxWidth:"50%",

  "& p": {
    fontFamily: "Poppins",
    fontSize: "1rem",
  },
  "& span": {
    fontFamily: "Poppins",
    fontSize: "0.7rem",
  },
  "@media (max-width:900px)": {
    maxWidth:"70%",

  },
}));

const ChatMessages = () => {
  const socket = useSocket();

  const [messages, setMessages] = React.useState([]);
  const [state] = useCtxValues();

  const messageEndRef = useRef(null);
  console.log("rednder msg",messages);

  useEffect(() => {
    socket.on("room-messages", (messages) => {
      setMessages(messages);
    });

    return () => {
      socket.off("room-messages");
    };
  }, []);

  useLayoutEffect(() => {
    scrollToBottom();
  }, [messages]);

  function scrollToBottom() {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <ChatMessagesWrapper>
      {messages.map(({ _id: date, messagesByDate }, index) => {
        return (
          <React.Fragment key={date}>
            <Divider
              sx={{
                color: "#fff",
                fontFamily: "Poppins",
                width: "100%",
                "&::before ,&::after": {
                  borderColor: "#fff",
                  top: 0,
                },
              }}
            >
              {date}
            </Divider>
            {messagesByDate.map((message) => {
              return (
                <MessageItem
                  fromMe={message.from.id === state.user.id}
                  key={message._id}
                >
                  <p>{message.content}</p>
                  <span>{message.time}</span>
                </MessageItem>
              );
            })}
            <div ref={messageEndRef} />
          </React.Fragment>
        );
      })}
    </ChatMessagesWrapper>
  );
};

export default React.memo(ChatMessages) ;
