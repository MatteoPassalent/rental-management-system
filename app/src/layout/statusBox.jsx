import { Box, AppBar } from "@mui/material";

const StatusBox = (props) => {
  return (
    <div
      style={{
        height: "100%",
        width: "30%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#546C78",
          height: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          boxShadow: "none",
        }}
      >
        {props.name}
      </AppBar>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "lightgrey",
          borderBottomLeftRadius: "10px",
          borderBottomRightRadius: "10px",
          padding: "20px",
          boxSizing: "border-box",
        }}
      >
        {props.children}
      </Box>
    </div>
  );
};

export default StatusBox;
