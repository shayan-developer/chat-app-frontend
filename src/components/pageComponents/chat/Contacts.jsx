import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";

import { styled } from "@mui/material/styles";
import useAsync from "hooks/useAsync";
import { getContactsReq } from "services/chat.api";
import { useSocket } from "context/socketCtx";
import useCtxValues, { userTypes } from "context";
import { orderIds } from "utils";

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

const Contacts = ({ handleSelect, currentChat }) => {
  const { run, value: contacts, loading } = useAsync(getContactsReq);
  const [state, dispatch] = useCtxValues();

  const [globalContacts, setGlobalContacts] = React.useState([]);
  console.log(globalContacts);

  const socket = useSocket();

  useEffect(() => {
    run();
  }, []);

  useEffect(() => {
    socket.emit("new-user", state.user.id);
    socket.on("new-user", (members) => {
      setGlobalContacts(members);
    });

    return () => {
      socket.off("new-user");
    };
  }, []);

  useEffect(() => {
    socket.on("notifications", (notifications) => {
      dispatch({ type: userTypes.ADD_NOTIFICATION, payload: notifications });
      console.log(notifications);
    });

    return () => {
      socket.off("notifications");
    };
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        height: "70%",
        overflow: "auto",
        "&::-webkit-scrollbar": {
          width: "0.5rem",
        },
        "&::-webkit-scrollbar-track": {
          backgroundColor: "#ccc",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "primary.main",
          borderRadius: "0.25rem",
        },
      }}
      component="div"
    >
      <Container>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            {!!contacts?.users.length && (
              <>
                <Typography
                  variant="h5"
                  sx={{
                    color: "white",
                    borderRadius: "0.25rem",
                    width: 1,
                    p: 1,
                    textAlign: "center",
                  }}
                >
                  Your Contacts
                </Typography>
                {contacts?.users?.map((contact) => (
                  <ContactItem
                    key={contact.userName}
                    contact={contact}
                    onClick={() => handleSelect(contact)}
                    isSelect={currentChat?.userName === contact.userName}
                    notifications={
                      state?.notifications?.[
                        orderIds(state.user.id, contact._id)
                      ]
                    }
                    status={contact.status}
                  />
                ))}
              </>
            )}
          </>
        )}
        <Typography
          variant="h5"
          sx={{
            color: "white",
            borderRadius: "0.25rem",
            width: 1,
            p: 1,
            textAlign: "center",
          }}
        >
          Global Contacts
        </Typography>
        {globalContacts?.map((contact) => (
          <ContactItem
            key={contact.userName}
            contact={contact}
            onClick={handleSelect.bind(null, contact)}
            isSelect={currentChat?.userName === contact.userName}
            notifications={
              state?.notifications?.[orderIds(state.user.id, contact._id)]
            }
            status={contact.status}
          />
        ))}
      </Container>
    </Box>
  );
};

const ContactItem = React.memo(
  ({ contact, onClick, isSelect, notifications, status }) => {
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
          <Typography
            variant="body"
            sx={{
              color: status === "Online" ? "primary.green" : "primary.red",
              ...(isSelect && { color: "white" }),
            }}
          >
            {status}
          </Typography>
        </div>
        {notifications && (
          <Box
            component={"span"}
            sx={{
              marginLeft: "auto",
              backgroundColor: "primary.main",
              width: "30px ",
              height: "30px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
            }}
          >
            {notifications}
          </Box>
        )}
      </ContactBox>
    );
  },
  (prev, next) => {
    return (
      prev.isSelect === next.isSelect &&
      prev.contact.userName === next.contact.userName &&
      prev.notifications === next.notifications &&
      prev.status === next.status
    );
  }
);

export default React.memo(Contacts);
