import { Box, AppBar } from "@mui/material";
import PropTypes from "prop-types";

const StatusBox = (props) => {
  return (
    <div
      style={{
        width: "30%",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
      }}
    >
      <AppBar
        position="static"
        sx={{
          color: "#1976d2",
          backgroundColor: "white",
          height: "35px",
          alignItems: "left",
          paddingLeft: "15px",
          justifyContent: "center",
          boxShadow: "none",
          fontWeight: "bold",
          fontSize: "1.3rem",
        }}
      >
        {props.name}
      </AppBar>
      <Box
        sx={{
          height: "calc(100% - 30px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          backgroundColor: "White",
        }}
      >
        {props.children}
      </Box>
    </div>
  );
};

StatusBox.propTypes = {
  name: PropTypes.string,
  children: PropTypes.element,
};

export default StatusBox;
