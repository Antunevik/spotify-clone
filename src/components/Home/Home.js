import { Box, Button } from "@mui/material";

const style = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  gap: 5,
};

const Home = ({}) => {
  return (
    <Box sx={style}>
      <img
        src="/ta-logo.png"
        style={{ maxHeight: "50%", maxWidth: "50%" }}
        alt="Techover"
      />
      <Button
        size="large"
        variant="contained"
        onClick={() =>
          (window.location.href = "https://www.academy.techover.nu/")
        }
      >
        Ansök nu
      </Button>
    </Box>
  );
};

export default Home;
