import { useMediaQuery } from "@mui/material";
import GlassBox from "components/GlassBox";
import React from "react";
import { useLocation } from "react-router-dom";
import ChatBox from "./ChatBox";
import Welcome from "./Welcome";

const RightSide = ({ chat, user }) => {
  const location = useLocation();
  const matches = useMediaQuery("(max-width:900px)");
  console.log("matches", matches);
  console.log(location);
  return (
    <GlassBox fullView>
      {!matches &&
        (chat ? (
          <ChatBox chat={chat ?? location.state} />
        ) : (
          <Welcome user={user} />
        ))}

      {/* moblie ver */}

      {matches && location.state && <ChatBox chat={chat ?? location.state} />}
    </GlassBox>
  );
};

export default RightSide;
