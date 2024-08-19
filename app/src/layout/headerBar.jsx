import { AppBar } from "@mui/material";

const HeaderBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "#1976D2",
        height: "50px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.3rem",
      }}
    >
      Rental Car Management System
    </AppBar>
  );
};

export default HeaderBar;
