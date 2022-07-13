import { CircularProgress, Grid } from "@mui/material";
import useCtxValues from "context";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import React from "react";
import GlassBox from "components/GlassBox";
import { Contacts, Header, Welcome } from "components/pageComponents/chat";

const ContainerChat = styled("div")(
  sx((theme) => ({
    width: 1,
    height: 1,
  }))
);

const Chat = () => {
  const [state, dispatch] = useCtxValues();

  const [tabs, setTabs] = React.useState(0);
  const [currentChat, setCurrentChat] = React.useState(null);

  const handleChange = (event, newValue) => {
    setTabs(newValue);
  };

  const handleSelect = (contact) => {
    setCurrentChat(contact);
  }

  return (
    <ContainerChat>
      <Grid container sx={{ height: 1 }} spacing={6}>
        {/* /* -------------------------------- left side ------------------------------- */}
        <Grid item xs={4} sx={{ height: 1 }}>
          <GlassBox fullView>
            <Header
              user={state.user}
              handChangeTab={handleChange}
              tabs={tabs}
            />

            <Contacts state={state} handleSelect={handleSelect} currentChat={currentChat}/>
          </GlassBox>
        </Grid>

        {/* /* ------------------------------- reight side ------------------------------ */}
        <Grid item xs={8} sx={{ height: 1 }}>
          <GlassBox fullView>
            <Welcome user={state.user} />
          </GlassBox>
        </Grid>
      </Grid>
    </ContainerChat>
  );
};

export default Chat;
