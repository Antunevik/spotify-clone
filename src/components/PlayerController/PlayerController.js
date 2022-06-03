import React, { useEffect } from "react";
import { formatTime } from "../../utilities/functions";
import { PlayArrow, SkipNext, SkipPrevious, Pause } from "@mui/icons-material";
import { IconButton, Grid, Stack, Typography, Slider } from "@mui/material";
import { connect } from "react-redux";
import { pause, playNewSong, setProgress } from "../../store/actions/index";

const PlayerController = ({
  sliderStyle,
  deviceId,
  pause,
  playing,
  duration,
  progress,
  loading,
  playNewSong,
  setProgress,
  spotifyApi,
}) => {
  const togglePlay = async () => {
    if (loading) return;

    if (!playing) {
      try {
        await spotifyApi.transferMyPlayback([deviceId]);
        playNewSong(spotifyApi);
      } catch (e) {
        console.error(e);
      }
    } else {
      pause();
      await spotifyApi.pause();
    }
  };

  const handleSkipPrevious = async () => {
    if (loading) return;
    await spotifyApi.skipToPrevious();
    playNewSong(spotifyApi, {});
  };

  const handleOnSkipNext = async () => {
    if (loading) return;
    await spotifyApi.skipToNext();
    playNewSong(spotifyApi, {});
  };

  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        setProgress(progress + 1);
      }, 1000);
    } else if (!playing && progress !== 0) {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };
  }, [playing, progress]);

  const handleOnChange = (e, v) => {
    setProgress(v);
  };

  const handleOnChangeCommitted = (event, value) => {
    spotifyApi.seek(value * 1000);
  };

  return (
    <Stack
      spacing={2}
      direction="column"
      justify="center"
      alignItems="center"
      sx={{ width: "100%" }}
    >
      <Stack
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%" }}
      >
        <IconButton
          size="small"
          sx={{ color: "white" }}
          onClick={async () => handleSkipPrevious()}
        >
          <SkipPrevious sx={{ width: 28, height: 28 }} />
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "white" }}
          onClick={async () => togglePlay()}
        >
          {playing ? (
            <Pause sx={{ width: 38, height: 38 }} />
          ) : (
            <PlayArrow sx={{ width: 38, height: 38 }} />
          )}
        </IconButton>
        <IconButton
          size="small"
          sx={{ color: "white" }}
          onClick={async () => handleOnSkipNext()}
        >
          <SkipNext sx={{ width: 28, height: 28 }} />
        </IconButton>
      </Stack>
      <Stack
        spacing={2}
        justifyContent={"center"}
        direction="row"
        alignItems="center"
        sx={{ width: "75%" }}
      >
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: 12 }}
        >
          {formatTime(progress)}
        </Typography>
        <Slider
          min={0}
          max={duration}
          sx={sliderStyle}
          size="medium"
          value={progress}
          aria-label="Default"
          onChange={handleOnChange}
          onChangeCommitted={handleOnChangeCommitted}
        />
        <Typography
          variant="body1"
          sx={{ color: "text.secondary", fontSize: 12 }}
        >
          {formatTime(duration)}
        </Typography>
      </Stack>
    </Stack>
  );
};

const mapState = (state) => {
  const {
    title,
    image,
    artist,
    duration,
    progress,
    device_id,
    playing,
    loading,
  } = state.player;
  return {
    deviceId: device_id,
    playing,
    title,
    image,
    artist,
    duration,
    progress,
    loading,
  };
};

const mapDispatch = (dispatch) => {
  return {
    pause: () => dispatch(pause()),
    playNewSong: (api) => dispatch(playNewSong(api)),
    setProgress: (progress) => dispatch(setProgress(progress)),
  };
};

export default connect(mapState, mapDispatch)(PlayerController);
