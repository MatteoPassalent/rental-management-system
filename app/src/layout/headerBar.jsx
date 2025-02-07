import { AppBar } from "@mui/material";

const HeaderBar = () => {
  return (
    <AppBar
      position="static"
      sx={{
        height: "50px",
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
