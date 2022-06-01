import SpotifyWebApi from "spotify-web-api-node";
import { get } from "spotify-web-api-node/src/http-manager";
import * as actionTypes from "./actionTypes";

export const addDevice = (device_id) => {
  return { type: actionTypes.ADD_DEVICE_ID, payload: device_id };
};

export const play = () => {
  return { type: actionTypes.PLAY };
};

export const pause = () => {
  return { type: actionTypes.PAUSE };
};

export const setProgress = (progress) => {
  return { type: actionTypes.SET_PROGRESS, payload: progress };
};

export const updatePlayerStart = () => {
  return { type: actionTypes.UPDATE_PLAYER_START };
};

export const updatePlayerSuccess = (payload) => {
  return { type: actionTypes.UPDATE_PLAYER_SUCCESS, payload };
};

export const updatePlayerFail = (error) => {
  return { type: actionTypes.UPDATE_PLAYER_FAIL, payload: error };
};

export const playNewSong = (spotifyApi, song) => {
  return async (dispatch) => {
    dispatch(updatePlayerStart());
    try {
      await spotifyApi.play(song);
      const track = await getMyCurrentPlayingTrack(spotifyApi);
      dispatch(play());
      dispatch(updatePlayerSuccess(track));
    } catch (error) {
      dispatch(updatePlayerFail(error));
    }
  };
};

//Uppdatera player komponenten med bild, text och progress
export const updateSongInfo = (spotifyApi) => {
  return async (dispatch) => {
    dispatch(updatePlayerStart());
    try {
      const track = await getMyCurrentPlayingTrack(spotifyApi);
      dispatch(updatePlayerSuccess(track));
    } catch (error) {
      dispatch(updatePlayerFail(error));
    }
  };
};

//Det här är inte en action
const getMyCurrentPlayingTrack = async (spotifyApi) => {
  const currentSong = await spotifyApi.getMyCurrentPlayingTrack();
  console.log(currentSong);
  const { item } = currentSong.body;
  const duration = item.duration_ms / 1000;
  const progress = currentSong.body.progress_ms / 1000;
  return {
    title: item.title,
    image: item.album.images[1],
    artist: item.artists[0].name,
    duration,
    progress,
  };
};
