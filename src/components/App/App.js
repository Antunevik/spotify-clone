import "./App.css";
import SideNav from "../SideNav/SideNav.js";
import Playlist from "../Playlist/Playlist.js";
import { Box } from "@mui/material";
import MobileNav from "../MobileNav/MobileNav.js";
import { Routes, Route } from "react-router-dom";
import Player from "../Player/Player";
import Library from "../Library/Library";
import Home from "../Home/Home";
import Login from "../Login/Login";
import { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser, fetchPlaylist, addDevice } from "../../store/actions/index";
import { WindowRounded } from "@mui/icons-material";

function App({ token, fetchUser, fetchPlaylist, spotifyApi }) {
  useEffect(() => {
    const getData = async () => {
      fetchUser(spotifyApi);
      fetchPlaylist(spotifyApi);
    };

    if (token) {
      window.onSpotifyWebPlaybackSDKReady = () => {
        setupSpotifyConnect(token, addDevice, spotifyApi);
      };
      getData();
    }
  }, [token, fetchUser]);

  const setupSpotifyConnect = (token, addDevice, spotifyAp) => {
    const player = new window.Spotify.Player({
      name: "Antunevik Spotify",
      getOAuthToken: (cb) => cb(token),
      volume: 0.5,
    });

    player.connect();
  };

  return (
    <Box className="App">
      {token ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ flex: 1, overflowY: "auto", display: "flex" }}>
            <SideNav />
            <Routes>
              <Route
                path="/playlist/:id"
                element={<Playlist spotifyApi={spotifyApi} />}
              />
              <Route
                path="/search"
                element={<h1 style={{ color: "white" }}>Search</h1>}
              />
              <Route path="/library" element={<Library />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Box>
          <Player spotifyApi={spotifyApi} />
          <MobileNav />
          <Banner />
        </Box>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      )}
    </Box>
  );
}

const Banner = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: 25,
        bgcolor: "primary.main",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        fontSize: 14,
        boxSizing: "border-box",
        paddingRight: "10px",
      }}
    >
      Made with love by Techover Academy
    </Box>
  );
};

const mapStateToProps = (state) => {
  return { token: state.auth.token };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUser: (api) => dispatch(fetchUser(api)),
    fetchPlaylist: (api) => dispatch(fetchPlaylist(api)),
    addDevice: (id) => dispatch(addDevice(id)),
  };
};

export default connect(mapStateToProps, mapDispatch)(App);
