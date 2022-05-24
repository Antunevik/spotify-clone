import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

function PlaylistItem({ name, playlistId, image, loading }) {
  const navigate = useNavigate();

  if (loading)
    return (
      <ListItem disablePadding>
        <ListItemButton>
          <ListItemAvatar sx={{ marginRight: "15px" }}>
            <Skeleton variant="rectangular" width={60} height={60} />
          </ListItemAvatar>
          <Skeleton variant="text" animation="wave" width={150} height={20} />
        </ListItemButton>
      </ListItem>
    );

  return (
    <Box
      onClick={() => {
        navigate(`/playlist/${playlistId}`);
      }}
      sx={{
        display: "flex",
        color: "text.secondary",
        alignItems: "center",
      }}
      py={1}
    >
      <Avatar
        alt="Remy Sharp"
        src={image}
        variant="square"
        sx={{ height: 60, width: 60, marginRight: "15px" }}
      />
      {name}
    </Box>
  );
}

export default PlaylistItem;
