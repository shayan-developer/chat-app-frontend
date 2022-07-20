import { Box, Modal, Stack, styled, Typography } from "@mui/material";
import React from "react";

import DoneIcon from "@mui/icons-material/Done";
import useCtxValues, { userTypes } from "context";

const BoxModalStyles = styled(Box)(({ theme }) => ({
  backgroundColor: "#fff",
  padding: "2rem",
  borderRadius: "1rem",
  boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.1)",
  width: "50%",
  maxWidth: "50%",
  margin: "auto",
  marginTop: "2rem",
  marginBottom: "2rem",
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    maxWidth: "100%",
    margin: "auto",
    marginTop: "2rem",
    marginBottom: "2rem",
  },
}));
const colors = [
  {
    name: "theme",
    color: "#800080",
  },
  {
    name: "theme2",
    color: "#A10035",
  },
  {
    name: "theme3",
    color: "#0078AA",
  },
  {
    name: "theme4",
    color: "#FF9F29",
  },
];

const SettingModal = ({ open, handleClose }) => {
  const [state, dispatch] = useCtxValues();

  const { theme: currentTheme } = state;

  const handleThemeChange = (theme) => {
    dispatch({ type: userTypes.CHANGE_THEME, payload: theme });
  };

  return (
    <Modal
      keepMounted
      open={open}
      onClose={handleClose}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
    >
      <BoxModalStyles>
        <Typography id="keep-mounted-modal-title" variant="h5" component="h5">
          Change Theme
        </Typography>
        <Stack direction={"row"} spacing={4} mt={6}>
          {colors.map((theme) => (
            <ThemeItem
              color={theme.color}
              key={theme.color}
              isSelect={currentTheme === theme.name}
              onClick={()=>handleThemeChange(theme.name)}
            />
          ))}
        </Stack>
      </BoxModalStyles>
    </Modal>
  );
};

const ThemeItem = ({ color, isSelect, onClick }) => {
  return (
    <Box
      sx={{
        backgroundColor: color,
        borderRadius: "0.25rem",
        width: "25%",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      {isSelect && (
        <DoneIcon sx={{ color: "#fff", width: 1, height: "60px" }} />
      )}
    </Box>
  );
};

export default SettingModal;
