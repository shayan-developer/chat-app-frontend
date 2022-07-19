import { Grid } from "@mui/material";
import useCtxValues, { userTypes } from "context";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import React, { useCallback } from "react";
import GlassBox from "components/GlassBox";
import {
  ChatBox,
  Contacts,
  Header,
  Welcome,
} from "components/pageComponents/chat";
import { useSocket } from "context/socketCtx";
import { orderIds } from "utils";

const ContainerChat = styled("div")(
  sx((theme) => ({
    width: 1,
    height: 1,
  }))
);

const Chat = () => {
  const [state, dispatch] = useCtxValues();
  const socket = useSocket();

  const [tabs, setTabs] = React.useState(0);
  const [currentChat, setCurrentChat] = React.useState(null);

  const handleChange = useCallback((event, newValue) => {
    setTabs(newValue);
  }, []);

  const handleSelect = useCallback((contact) => {
    setCurrentChat(contact);
    const orderId = orderIds(state.user.id, contact._id);
    socket.emit("join-room", orderId);
    dispatch({
      type: userTypes.REMOVE_NOTIFICATION,
      payload: orderId,
    });
  }, []);

  return (
    <ContainerChat>
      <Grid container sx={{ height: 1 }} spacing={6}>
        {/* /* -------------------------------- left side ------------------------------- */}
        <Grid item xs={4} sx={{ height: 1 }}>
          <GlassBox fullView>
            <Header handChangeTab={handleChange} tabs={tabs} />

            <Contacts handleSelect={handleSelect} currentChat={currentChat} />
          </GlassBox>
        </Grid>

        {/* /* ------------------------------- reight side ------------------------------ */}
        <Grid item xs={8} sx={{ height: 1 }}>
          <GlassBox fullView>
            {currentChat ? (
              <ChatBox chat={currentChat} />
            ) : (
              <Welcome user={state.user} />
            )}
          </GlassBox>
        </Grid>
      </Grid>
    </ContainerChat>
  );
};

export default Chat;
