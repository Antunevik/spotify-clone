import React from "react";
import { Box, Grid, Divider } from "@mui/material";
import { AccessTimeRounded } from "@mui/icons-material";
import SongRow from "../SongRow/SongRow";

const SongTable = ({ songs, i }) => {
  const renderSongs = () =>
    songs.map((song, i) => {
      console.log(song);
      const albumName = song.album.name;
      //TODO will cause crashes when there are not images
      const image = song.album.images[0].url;
      const title = song.name;
      const artist = song.artists[0].name;
      const duration = song.duration_ms / 1000;

      return (
        <SongRow
          album={albumName}
          image={image}
          title={title}
          artist={artist}
          duration={duration}
          key={i}
          i={i}
        />
      );
    });

  return (
    <Box
      p={{ xs: 3, md: 4 }}
      xs={{
        flex: 1,
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Grid
        key={i}
        container
        px={2}
        py={1}
        sx={{ width: "100%", color: "text.secondary", fontSize: 14 }}
      >
        <Grid item sx={{ width: 35, display: "flex", alignItems: "center" }}>
          #
        </Grid>
        <Grid item sx={{ flex: 1, display: "flex", alignItems: "center" }}>
          Title
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            display: { xs: "none", md: "flex" },
            alignItems: "center",
          }}
        >
          Album
        </Grid>
        <Grid
          item
          xs={3}
          sx={{
            // display: { xs: "none", md: "flex" },
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <AccessTimeRounded sx={{ width: 20, height: 20 }} />
        </Grid>
      </Grid>
      <Box pb={2}>
        <Divider sx={{ width: "100%", height: 1 }} />
      </Box>
      {renderSongs()}
    </Box>
  );
};

export default SongTable;
