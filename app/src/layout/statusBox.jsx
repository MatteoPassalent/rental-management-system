import { Box, AppBar, useMediaQuery } from "@mui/material";
import PropTypes from "prop-types";

const StatusBox = (props) => {
  const isReduced = useMediaQuery("(max-width:1295px)");
  return (
    <div
      style={{
        width: isReduced ? "90%" : "30%",
        margin: "0px 20px 0px 20px",
        marginBottom: isReduced ? "20px" : "0",
        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.2)",
        maxWidth: "460px",
      }}
    >
      <AppBar
        position="static"
        sx={{
          color: "#1976d2",
          backgroundColor: "white",
          height: "35px",
          alignItems: isReduced ? "center" : "left",
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
