import { Avatar, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { styled, experimental_sx as sx } from "@mui/material/styles";
import useAsync from "hooks/useAsync";
import { getContactsReq } from "services/chat.api";

const Container = styled("div")(({ theme }) => ({
  padding: "0.5rem",
  ...theme.centerCol,
}));

const ContactBox = styled("div", {
  shouldForwardProp: (prop) => !["isSelect"].includes(prop),
})(({ theme, isSelect }) => {
  return {
    background: isSelect
      ? theme.palette.primary.main
      : "rgba(255, 255, 255, 0.8)",
    padding: "0.5rem",
    borderRadius: "0.25rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    width: "100%",
    gap: "1rem",
    color: isSelect ? "white" : "#000",
    "&:hover": {
      background: isSelect
        ? theme.palette.primary.main
        : "rgba(255, 255, 255, 0.9)",
    },
  };
});

const Contacts = ({ state, handleSelect, currentChat }) => {
  const { run, value: contacts, loading } = useAsync(getContactsReq);

  useEffect(() => {
    run();
  }, []);

  return (
    <Container>
      {loading ? (
        <CircularProgress />
      ) : (
        contacts?.users?.map((contact) => (
          <ContactItem
            key={contact.userName}
            contact={contact}
            onClick={handleSelect.bind(null, contact)}
            isSelect={currentChat?.userName === contact.userName}
          />
        ))
      )}
    </Container>
  );
};

const ContactItem = ({ contact, onClick, isSelect }) => {
  return (
    <ContactBox onClick={onClick} isSelect={isSelect}>
      <Avatar
        src={contact.avatar}
        sx={{
          width: 65,
          height: 65,
        }}
      />
      <div>
        <Typography variant="h5">{contact.userName}</Typography>
        <Typography variant="body">online</Typography>
      </div>
    </ContactBox>
  );
};

export default Contacts;
