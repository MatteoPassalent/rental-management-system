import { Card, Typography, Button } from "@mui/material";
import { useState } from "react";

const CarItem = () => {
  return (
    <Card
      sx={{
        marginBottom: "10px",
        height: "150px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "left",
        alignItems: "top",
        boxSizing: "border-box",
        padding: "15px",
        flexDirection: "row",
      }}
    >
      <div style={{ marginRight: "15px" }}>
        <Typography>Make: </Typography>
        <Typography>Model: </Typography>
        <Typography>Year: </Typography>
        <Typography>Colour: </Typography>
        <Typography>Plate Number: </Typography>
      </div>
      <div style={{ marginRight: "20px" }}>
        <Typography>Toyota</Typography>
        <Typography>Corolla</Typography>
        <Typography>2021</Typography>
        <Typography>Black</Typography>
        <Typography>ABC123</Typography>
      </div>
      <div></div>
    </Card>
  );
};

export default CarItem;
