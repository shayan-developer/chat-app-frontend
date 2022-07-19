import React, { useLayoutEffect } from "react";
import { styled } from "@mui/material/styles";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";
import useCtxValues from "context";
import { useSocket } from "context/socketCtx";
import { orderIds } from "utils";

const ChatInputWrapper = styled("div")({
  padding: "1rem",
  backgroundColor: "#fff",
  display: "flex",
  gap: "1rem",
  position: "relative",
  "@media (max-width:900px)": {
    padding: "0.7rem",
    gap: "0.7rem",
  },
});

const ChatInput = ({ chat }) => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const [state] = useCtxValues();
  const socket = useSocket();
  const { user } = state;
  const handleShowEmojiPicker = (e) => {
    e.stopPropagation();
    setShowEmojiPicker(!showEmojiPicker);
  };

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const todayDate = getFormattedDate();

  useLayoutEffect(() => {
    const clickout = (e) => {
      setShowEmojiPicker(false);
    };
    window.document.addEventListener("click", clickout);

    return () => {
      window.document.removeEventListener("click", clickout);
    };
  }, []);

  const onEmojiClick = (e, emojiObject) => {
    e.stopPropagation();
    const { emoji } = emojiObject;
    const newMessage = `${message}${emoji}`;
    setMessage(newMessage);
  };

  const onFinish = () => {
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const orderId = orderIds(user.id, chat._id);
    socket.emit("message-room", orderId, message, user, time, todayDate);
    setMessage("");
  };

  return (
    <ChatInputWrapper>
      {showEmojiPicker && (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{ position: "absolute", bottom: "110%", left: "0" }}
        />
      )}

      <IconButton color="primary" onClick={handleShowEmojiPicker} sx={{p:0}}>
        <EmojiEmotionsIcon />
      </IconButton>
      <div style={{ width: "100%" }}>
        <OutlinedInput
          placeholder={"Enter your message"}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          name="message"
          size="small"
          sx={{
            width: 1,
            "&  label": {
              fontSize: "0.9rem !important",
            },
            "&  input::placeholder": {
              fontSize: "0.9rem !important",
            },
          }}
          endAdornment={
            <InputAdornment position="start">
              <IconButton
                type="submit"
                color="primary"
                onClick={onFinish}
                disabled={!!!message.trim()}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </div>
    </ChatInputWrapper>
  );
};

export default ChatInput;
