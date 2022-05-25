import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import PlaylistItem from "../PlaylistItem/PlaylistItem";
import { connect } from "react-redux";

function Library({ playlists, loading }) {
  const renderPlaylistItems = () => {
    if (loading)
      return [1, 2, 3, 4, 5, 6].map((e, i) => (
        <PlaylistItem key={i} loading={loading} />
      ));
    return playlists.map((playlist, i) => (
      <PlaylistItem {...playlist} key={i} />
    ));
  };

  return (
    <Box
      className="Library"
      p={3}
      sx={{
        display: { xs: "flex", md: "none" },
        background: "black",
        flex: 1,
        flexDirection: "column",
        overflowY: "auto",
      }}
    >
      <Typography variant="h2" fontWeight={"bold"} sx={{ color: "white" }}>
        Ditt bibliotek
      </Typography>
      <List>{renderPlaylistItems()}</List>
    </Box>
  );
}

const mapState = (state) => {
  return {
    playlists: state.playlist.items,
    loading: state.playlist.loading,
  };
};

export default connect(mapState)(Library);
