import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import { Avatar, Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import useCtxValues, { userTypes } from "context";
import { useSocket } from "context/socketCtx";
import SettingModal from "./SettingModal";

const Header = ({ handChangeTab, tabs }) => {
  const [state, dispatch] = useCtxValues();
  const { user } = state;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const socket = useSocket();

  const logoutHand = () => {
    dispatch({ type: userTypes.LOGOUT });
    socket.emit("logout", user.id);
  };

  return (
    <Box
      component={"nav"}
      sx={(t) => ({
        ...t.centerCol,
        width: 1,
        height: "30%",
        p: 2,
        backgroundColor: "#fff",
      })}
    >
      <Box
        component={"section"}
        sx={{
          display: "flex",
          gap: "1rem",
          width: 1,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          component={"div"}
          sx={(t) => ({
            ...t.center,
          })}
        >
          <Avatar
            src={user.avatar}
            sx={{
              width: 75,
              height: 75,
            }}
          />
          <Box>
            <Typography variant="h5">{user.userName}</Typography>
            <Typography variant="body" sx={{ color: "primary.green" }}>
              Online
            </Typography>
          </Box>
        </Box>
        <Box>
          <IconButton color="primary" onClick={handleOpen}>
            <SettingsIcon />
          </IconButton>
          <IconButton onClick={logoutHand} color="primary">
            <PowerSettingsNewIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider sx={{ width: 1 }} />
      <Box
        component={"div"}
        sx={(t) => ({
          ...t.center,
        })}
      >
        <Tabs
          value={tabs}
          onChange={handChangeTab}
          aria-label="icon tabs example"
        >
          <Tab icon={<AccountCircleIcon />} aria-label="phone" />
          <Tab icon={<FavoriteIcon />} aria-label="favorite" />
          <Tab icon={<PhoneIcon />} aria-label="person" />
        </Tabs>
      </Box>
      <SettingModal open={open} handleClose={handleClose} />
    </Box>
  );
};

export default React.memo(Header);
