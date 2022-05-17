import React from "react";
import { Avatar, Box, Typography } from "@mui/material";

const Playlist = (props) => {
  return (
    <Box sx={{ bgcolor: "background.paper", flex: 1, overflowY: "auto" }}>
      <Box
        p={{ xs: 3, md: 4 }}
        sx={{
          width: "100%",
          background:
            "linear-gradient(0deg, rgba(17,38,25,1) 0%, rgba(24,115,38,1) 100%);",
          display: "flex",
          justifyContent: "flex-start",
          aignItems: { xs: "flex-start", md: "flex-end", xl: "center" },
          gap: 3,
          boxSizing: "border-box",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Avatar
          src="../../img/bieber.jpg"
          variant="square"
          alt="bieber"
          sx={{
            boxShadow: 15,
            width: { xs: "100", md: 235 },
            height: { xs: "100", md: 235 },
          }}
        />
        <Box>
          <Typography sx={{ fontSize: 12, fontWeight: "bold" }}>
            Playlist
          </Typography>
          <Typography sx={{ fontSize: 42, fontWeight: "bold" }}>
            Code life
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Playlist;
