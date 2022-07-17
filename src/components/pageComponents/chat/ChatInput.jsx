import React, { useLayoutEffect } from "react";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import Picker from "emoji-picker-react";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import SendIcon from "@mui/icons-material/Send";
import { IconButton, InputAdornment, OutlinedInput } from "@mui/material";

const ChatInputWrapper = styled("div")({
  padding: "1rem",
  backgroundColor: "#fff",
  display: "flex",
  gap: "1rem",
  position: "relative",
});

const ChatInput = () => {
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleShowEmojiPicker = (e) => {
    e.stopPropagation()
    setShowEmojiPicker(!showEmojiPicker);
  };

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
    e.stopPropagation()
    const { emoji } = emojiObject;
    const newMessage = `${message}${emoji}`;
    setMessage(newMessage);
  };

  const onFinish = () => {
    console.log(message);
  };

  return (
    <ChatInputWrapper>
      {showEmojiPicker && (
        <Picker
          onEmojiClick={onEmojiClick}
          pickerStyle={{ position: "absolute", bottom: "110%", left: "0" }}
        />
      )}

      <IconButton color="primary" onClick={handleShowEmojiPicker}>
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
