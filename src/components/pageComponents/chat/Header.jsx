import React from "react";
import PhoneIcon from "@mui/icons-material/Phone";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Avatar, Box, Divider, Tab, Tabs, Typography } from "@mui/material";

const Header = ({ user, handChangeTab, tabs }) => {
  return (
    <Box
      component={"nav"}
      sx={(t) => ({
        ...t.centerCol,
        width: 1,
        p: 2,
        backgroundColor: "#fff",
      })}
    >
      <Box
        component={"div"}
        sx={{ display: "flex", gap: "1rem", alignItems: "center", width: 1 }}
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
      <Divider sx={{width:1}}/>
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
    </Box>
  );
};

export default Header;
