import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@mui/material";

const PlaylistItem = ({ name, id, images, loading }) => {
  const navigate = useNavigate();

  if (loading) {
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
  }
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={() => navigate(`/playlist/${id}`)}>
        <ListItemAvatar sx={{ marginRight: "16px" }}>
          <Avatar
            src={images?.[0]?.url}
            variant="square"
            width={60}
            height={60}
          />
        </ListItemAvatar>
        <ListItemText primary={name} sx={{ color: "text.primary" }} />
      </ListItemButton>
    </ListItem>
  );
};

export default PlaylistItem;
