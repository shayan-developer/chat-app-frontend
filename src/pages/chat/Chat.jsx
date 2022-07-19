import { Grid, Typography } from "@mui/material";
import useCtxValues, { userTypes } from "context";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import React, { useCallback } from "react";
import GlassBox from "components/GlassBox";
import {
  Contacts,
  Header,
} from "components/pageComponents/chat";
import { useSocket } from "context/socketCtx";
import { orderIds } from "utils";
import useMediaQuery from "@mui/material/useMediaQuery";
import RightSide from "components/pageComponents/chat/RightSide";

const ContainerChat = styled("div")(
  sx((theme) => ({
    width: 1,
    height: 1,
  }))
);

const Chat = () => {
  const [state, dispatch] = useCtxValues();
  const socket = useSocket();
  const matches = useMediaQuery("(max-width:900px)");

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
      <Grid container sx={{ height: 1 }} spacing={matches ? 0 : 6}>
        {/* /* -------------------------------- left side ------------------------------- */}

        <Grid item xs={12} sm={12} md={4} sx={{ height: 1 }}>
          <GlassBox fullView>
            <Header handChangeTab={handleChange} tabs={tabs} />

            {tabs === 0 ? (
              <Contacts handleSelect={handleSelect} currentChat={currentChat} />
            ) : (
              <Typography
                variant="h4"
                sx={{ color: "#fff", textAlign: "center", marginTop: "1rem" }}
              >
                coming soon...
              </Typography>
            )}
          </GlassBox>
        </Grid>

        {/* /* ------------------------------- right side ------------------------------ */}

        {!matches && (
          <Grid item xs={12} sm={12} md={8} sx={{ height: 1 }}>
            <RightSide chat={currentChat} user={state.user} />
          </Grid>
        )}
      </Grid>
    </ContainerChat>
  );
};

export default Chat;
