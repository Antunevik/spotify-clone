import React, { useEffect } from "react";
import { Box, Grid, Typography, Avatar } from "@mui/material";
import VolumeControls from "../VolumeControls/VolumeControls";
import PlayerController from "../PlayerController/PlayerController";
import { connect } from "react-redux";
import { updateSongInfo } from "../../store/actions/index";

const Player = ({ updateSongInfo, title, image, artist, spotifyApi }) => {
  const sliderStyle = {
    color: "#fff",
    height: 4,
    padding: 0,
    width: "100%",
    "& .Mui-focusVisible": {
      boxShadow: "none",
    },
    "& .MuiSlider-thumb": {
      width: 0,
      height: 0,
      "&:hover": {
        boxShadow: "none",
      },
      "&:focus": {
        boxShadow: "none",
      },
    },
    "&:hover": {
      "& .MuiSlider-track": {
        backgroundColor: "primary.main",
      },
      "& .MuiSlider-thumb": {
        width: 12,
        height: 12,
      },
    },
    "& .MuiSlider-track": {
      border: "none",
    },
  };

  useEffect(() => {
    updateSongInfo(spotifyApi);
  }, []);

  return (
    <Box>
      <Grid
        container
        px={3}
        sx={{
          bgcolor: "background.paper",
          height: 100,
          width: "100%",
          borderTop: "1px solid #292929",
        }}
      >
        <Grid
          item
          xs={3}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
        >
          <Avatar
            src={image?.url}
            alt="logo"
            variant="square"
            sx={{ width: 56, height: 56, marginRight: 2 }}
          />
          <Box>
            <Typography sx={{ color: "text.primary", fontSize: 14 }}>
              {title}
            </Typography>
            <Typography sx={{ color: "text.secondary", fontSize: 12 }}>
              {artist}
            </Typography>
          </Box>
        </Grid>
        <PlayerController sliderStyle={sliderStyle} spotifyApi={spotifyApi} />
        <VolumeControls sliderStyle={sliderStyle} spotifyApi={spotifyApi} />
      </Grid>
    </Box>
  );
};

const mapState = (state) => {
  const { title, image, artist } = state.player;
  return {
    title,
    image,
    artist,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateSongInfo: (api) => dispatch(updateSongInfo(api)),
  };
};

export default connect(mapState, mapDispatchToProps)(Player);
