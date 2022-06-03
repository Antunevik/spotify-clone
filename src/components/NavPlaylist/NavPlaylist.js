import { Box, Skeleton } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavPlaylist = ({ name, id, loading }) => {
  return (
    <NavLink
      to={loading ? "" : `/playlist/${id}`}
      style={{ textDecoration: "none" }}
    >
      <Box
        px={3}
        py={1}
        sx={{
          color: "text.secondary",
          cursor: "pointer",
          fontsize: 4,
          "&:hover": { color: "text.primary" },
        }}
      >
        {loading ? (
          <Skeleton variant={"text"} height={"14px"} width={"40px"} />
        ) : (
          name
        )}
      </Box>
    </NavLink>
  );
};

export default NavPlaylist;
