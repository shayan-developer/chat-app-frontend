import React, { useCallback, useEffect } from "react";
import { AvatarGenerator } from "random-avatar-generator";
import GlassBox from "components/GlassBox";
import { styled, experimental_sx as sx } from "@mui/material/styles";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Button from "components/Button";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import useCtxValues from "context";
import { useNavigate } from "react-router-dom";
import { setAvatarReq } from "services/chat.api";

const generator = new AvatarGenerator();

const ContainerBox = styled("div")(
  sx((theme) => ({
    ...theme.centerCol,
    py: 3,
    height: 1,
    gap: "2rem",
  }))
);

const SetAvatar = () => {
  const [avatars, setAvatars] = React.useState([]);
  const [update, setUpdate] = React.useState(false);
  const [selectedAvatar, setSelectedAvatar] = React.useState(null);
  const [state, dispatch] = useCtxValues();
  const navigate = useNavigate();


  const handleNext = async () => {
    if (!selectedAvatar) {
      toast.error("Please select an avatar");
      return;
    }
    try {
      const data = await setAvatarReq(
        { avatar: selectedAvatar },
        state.user.id
      );
      dispatch({ type: "SET_AVATAR", payload: selectedAvatar });
      navigate("/chat");
    } catch (error) {
      console.log(error);
    }
  };

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar);
  };

  const generatorAvatars = useCallback(() => {
    const avatars = [];
    for (let i = 0; i < 6; i++) {
      avatars.push(generator.generateRandomAvatar());
    }
    setAvatars(avatars);
  }, []);

  useEffect(() => {
    generatorAvatars();
  }, [update]);

  return (
    <GlassBox>
      <ContainerBox>
        <Typography variant="h4" sx={{ color: "#fff" }}>
          Pick an avatar for your account
        </Typography>
        <Stack direction={"row"} spacing={6} mt={6}>
          {avatars.length ? (
            avatars?.map((avatar) => (
              <Avatar
                key={avatar}
                src={avatar}
                onClick={handleAvatarClick?.bind(null, avatar)}
                sx={{
                  width: 85,
                  height: 85,
                  cursor: "pointer",

                  boxShadow:
                    selectedAvatar?.toString() === avatar?.toString()
                      ? " 0px 0px 10px 10px #fff"
                      : "none",
                }}
              />
            ))
          ) : (
            <CircularProgress />
          )}
        </Stack>
        <Button
          size="large"
          sx={{ width: "50%", mt: 6 }}
          onClick={() => {
            setUpdate(!update);
          }}
        >
          generate another avatars
        </Button>
        <Button sx={{ width: "50%" }} size="large" onClick={handleNext}>
          Next
        </Button>
      </ContainerBox>
    </GlassBox>
  );
};

export default SetAvatar;
