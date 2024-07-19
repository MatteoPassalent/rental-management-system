import { Card, Typography, Button } from "@mui/material";
import RentDialog from "../dialogs/rentDialog";
import { useState } from "react";
import MaintenanceDialog from "../dialogs/maintenanceDialog";

const CarItem = (props) => {
  const [openRentDialog, toggleRentDialog] = useState(false);
  const [openMaintenanceDialog, toggleMaintenanceDialog] = useState(false);

  const updateStatus = async (status) => {
    await fetch("/update-status", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.car.id,
        status: status,
      }),
    });
    props.setFlag((prev) => !prev);
  };
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
        <Typography>{props.car.make}</Typography>
        <Typography>{props.car.model}</Typography>
        <Typography>{props.car.year}</Typography>
        <Typography>{props.car.color}</Typography>
        <Typography>{props.car.licensePlate}</Typography>
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
            onClick={() => toggleRentDialog(true)}
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
            onClick={() => toggleMaintenanceDialog(true)}
          >
            Maintence
          </Button>
          <RentDialog open={openRentDialog} toggleOpen={toggleRentDialog} />
          <MaintenanceDialog
            open={openMaintenanceDialog}
            toggleOpen={toggleMaintenanceDialog}
            updateStatus={updateStatus}
          />
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
            onClick={() => toggleRentDialog(true)}
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
            onClick={() => updateStatus("inventory")}
          >
            Return to Inventory
          </Button>
          <RentDialog open={openRentDialog} toggleOpen={toggleRentDialog} />
          <MaintenanceDialog
            open={openMaintenanceDialog}
            toggleOpen={toggleMaintenanceDialog}
          />
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
            onClick={() => toggleMaintenanceDialog(true)}
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
            onClick={() => updateStatus("inventory")}
          >
            Return to Inventory
          </Button>
          <RentDialog open={openRentDialog} toggleOpen={toggleRentDialog} />
          <MaintenanceDialog
            open={openMaintenanceDialog}
            toggleOpen={toggleMaintenanceDialog}
          />
        </div>
      )}
    </Card>
  );
};

export default CarItem;
