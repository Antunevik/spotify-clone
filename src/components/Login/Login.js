import { Box, Button } from "@mui/material";
import { accessURL } from "../../config/config";
import React from "react";

const Login = () => {
  return (
    <Box
      sx={{
        bgcolor: "background.paper",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <img
        src="../../img/Spotify_Logo_RGB_White.png"
        alt="Techover Spotify"
        style={{ marginBottom: 300, width: "70%", maxWidth: 500 }}
      />
      <Button href={accessURL} color="primary" variant="contained" size="large">
        Login to Spotify
      </Button>
    </Box>
  );
};

export default Login;
