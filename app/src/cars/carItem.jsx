import { Card, Typography, Button } from "@mui/material";
import RentDialog from "../dialogs/rentDialog";
import { useState } from "react";
import MaintenanceDialog from "../dialogs/maintenanceDialog";

const CarItem = (props) => {
  const [open, toggleOpen] = useState(false);
  const [open2, toggleOpen2] = useState(false);
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
      <div style={{ marginRight: "15px", minWidth: "105px" }}>
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
      {props.status === "inventory" && (
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginRight: "10px",
              marginBottom: "10px",
              width: "100%",
              backgroundColor: "#B4C1CC",
            }}
            onClick={() => toggleOpen(true)}
          >
            Rent Out
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginRight: "10px",
              width: "100%",
              backgroundColor: "#B4C1CC",
            }}
            onClick={() => toggleOpen2(true)}
          >
            Maintence
          </Button>
          <RentDialog open={open} toggleOpen={toggleOpen} />
          <MaintenanceDialog open2={open2} toggleOpen2={toggleOpen2} />
        </div>
      )}
      {props.status === "maintenance" && (
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginRight: "10px",
              marginBottom: "10px",
              width: "100%",
              backgroundColor: "#B4C1CC",
            }}
            onClick={() => toggleOpen(true)}
          >
            Rent Out
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginRight: "10px",
              width: "100%",
              backgroundColor: "#B4C1CC",
            }}
            onClick={() => console.log("return to inventory")}
          >
            Return to Inventory
          </Button>
          <RentDialog open={open} toggleOpen={toggleOpen} />
          <MaintenanceDialog open2={open2} toggleOpen2={toggleOpen2} />
        </div>
      )}
      {props.status === "rented" && (
        <div style={{ width: "100%" }}>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginRight: "10px",
              marginBottom: "10px",
              width: "100%",
              backgroundColor: "#B4C1CC",
            }}
            onClick={() => toggleOpen2(true)}
          >
            Maintence
          </Button>
          <Button
            variant="contained"
            color="inherit"
            sx={{
              marginRight: "10px",
              width: "100%",
              backgroundColor: "#B4C1CC",
            }}
            onClick={() => console.log("return to inventory")}
          >
            Return to Inventory
          </Button>
          <RentDialog open={open} toggleOpen={toggleOpen} />
          <MaintenanceDialog open2={open2} toggleOpen2={toggleOpen2} />
        </div>
      )}
    </Card>
  );
};

export default CarItem;
