import { Box, InputBase, Grid, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SongTable from "../SongTable/SongTable";

const boxStyle = {
  minHeight: "calc(100vh - 90px)",
  bgcolor: "background.paper",
  padding: "30px",
  paddingLeft: { md: "300px", sm: "30px" },
  overflowY: "auto",
  flex: 1,
};

const Search = ({ spotifyApi }) => {
  const [songs, setSongs] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatSongData = (tracks) => {
    return tracks.map((track) => {
      return {
        ...track,
        contextUri: track.album.uri,
        position: track.track_number - 1,
      };
    });
  };

  const handleOnChange = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { value } = e.target;

    if (value === "") {
      setSongs(null);
      setLoading(false);
      return;
    }

    try {
      const result = await spotifyApi.searchTracks(value);
      const { items } = result.body.tracks;
      console.log(items);
      const formattedSong = formatSongData(items);
      console.log(formattedSong);
      setSongs(formattedSong);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Box sx={boxStyle}>
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          borderRadius: 20,
          padding: "6px 20px",
          display: "flex",
          alignItems: "center",
          width: 250,
          backgroundColor: "white",
          color: "black",
          marginBottom: 20,
        }}
      >
        <SearchIcon fontSize="large" sx={{ marginRight: "6px" }} />
        <InputBase
          id="outlined-basic"
          label="Songs or Artists"
          variant="outlined"
          sx={{ color: "black" }}
          onChange={handleOnChange}
        />
      </form>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          {songs === null ? (
            <Typography sx={{ color: "text.primary" }}>
              Search for Songs
            </Typography>
          ) : (
            // <Typography sx={{ color: "text.primary" }}>
            //   Songs go here
            // </Typography>
            <SongTable
              songs={songs}
              loading={loading}
              spotifyApi={spotifyApi}
            />
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Search;
