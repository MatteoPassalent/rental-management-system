import { Card, Typography, Button } from "@mui/material";
import RentDialog from "../dialogs/rentDialog";
import { useState } from "react";
import MaintenanceDialog from "../dialogs/maintenanceDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ConfirmDialog from "../dialogs/confirmDialog";
import PropTypes from "prop-types";
// TODO: ADD CSS CLASSES FOR BUTTONS, fix margin
const apiUrl = process.env.REACT_APP_API_URL;

const CarItem = (props) => {
  const [rentDialog, setRentDialog] = useState(false);
  const [maintenanceDialog, setMaintenanceDialog] = useState(false);
  const [confirmDialog, setConfirmDialog] = useState(false);

  const updateStatus = async (status) => {
    await fetch(`${apiUrl}/update-status`, {
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

  const handleDelete = async () => {
    await fetch(`${apiUrl}/delete-car`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.car.id,
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
        paddingBottom: "15px",
        paddingLeft: "15px",
        flexDirection: "row",
      }}
    >
      <div
        style={{ marginRight: "15px", marginTop: "15px", minWidth: "105px" }}
      >
        <Typography>Make: </Typography>
        <Typography>Model: </Typography>
        <Typography>Year: </Typography>
        <Typography>Colour: </Typography>
        <Typography>Plate Number: </Typography>
      </div>
      <div
        style={{ marginRight: "20px", marginTop: "15px", minWidth: "100px" }}
      >
        <Typography>{props.car.make}</Typography>
        <Typography>{props.car.model}</Typography>
        <Typography>{props.car.year}</Typography>
        <Typography>{props.car.color}</Typography>
        <Typography>{props.car.licensePlate}</Typography>
      </div>
      <div
        style={{ flexDirection: "column", width: "100%", marginRight: "15px" }}
      >
        <div
          style={{ display: "flex", width: "100%", justifyContent: "right" }}
        >
          <IconButton
            sx={{
              top: "5px",
              right: "5px",
              color: "lightgrey",
            }}
            onClick={() => setConfirmDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        <div style={{ width: "100%" }}>
          {(props.status === "inventory" || props.status === "maintenance") && (
            <Button
              variant="contained"
              color="inherit"
              sx={{
                marginRight: "10px",
                marginBottom: "10px",
                width: "100%",
                backgroundColor: "#B4C1CC",
              }}
              onClick={() => setRentDialog(true)}
            >
              Rent Out
            </Button>
          )}
          {(props.status === "inventory" || props.status === "rented") && (
            <Button
              variant="contained"
              color="inherit"
              sx={{
                marginRight: "10px",
                marginBottom: "10px",
                width: "100%",
                backgroundColor: "#B4C1CC",
              }}
              onClick={() => setMaintenanceDialog(true)}
            >
              Maintence
            </Button>
          )}
          {(props.status === "maintenance" || props.status === "rented") && (
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
          )}
        </div>
        {rentDialog && (
          <RentDialog
            open={rentDialog}
            car={props.car}
            toggleOpen={setRentDialog}
            updateStatus={updateStatus}
          />
        )}
        {maintenanceDialog && (
          <MaintenanceDialog
            open={maintenanceDialog}
            toggleOpen={setMaintenanceDialog}
            updateStatus={updateStatus}
          />
        )}
        {confirmDialog && (
          <ConfirmDialog
            open={confirmDialog}
            toggleOpen={setConfirmDialog}
            handleDelete={handleDelete}
          />
        )}
      </div>
    </Card>
  );
};

CarItem.propTypes = {
  car: PropTypes.object,
  status: PropTypes.string,
  setFlag: PropTypes.func,
};

export default CarItem;
