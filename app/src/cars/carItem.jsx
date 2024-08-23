import { Card, Typography, Button } from "@mui/material";
import RentDialog from "../dialogs/rentDialog";
import { useState } from "react";
import MaintenanceDialog from "../dialogs/maintenanceDialog";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import ConfirmDialog from "../dialogs/confirmDialog";
import PropTypes from "prop-types";

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

  const returnCar = async () => {
    await fetch(`${apiUrl}/return-car`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: props.car.id,
      }),
    });
    updateStatus("inventory");
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
        height: "150px",
        maxWidth: "460px",
        borderRadius: "0px",
        borderBottom: "1px solid lightgrey",
        display: "flex",
        boxSizing: "border-box",
        padding: "10px 15px 10px 15px",
      }}
    >
      <div style={{ minWidth: "75px" }}>
        <Typography>Make: </Typography>
        <Typography>Model: </Typography>
        <Typography>Year: </Typography>
        <Typography>Colour: </Typography>
        <Typography>Plate: </Typography>
      </div>
      <div
        style={{
          marginRight: "15px",
          minWidth: "100px",
          maxWidth: "100px",
          overflow: "hidden",
        }}
      >
        <Typography>{props.car.make}</Typography>
        <Typography>{props.car.model}</Typography>
        <Typography>{props.car.year}</Typography>
        <Typography>{props.car.color}</Typography>
        <Typography>{props.car.licensePlate}</Typography>
      </div>
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          maxWidth: "240px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              props.status === "inventory" ? "right" : "space-between",
            alignItems: "center",
          }}
        >
          {props.status === "rented" && (
            <Typography style={{ fontSize: "12px", overflow: "hidden" }}>
              {props.car.currCustomerName}: {props.car.daysRemaining} days
            </Typography>
          )}
          {props.status === "maintenance" && (
            <Typography style={{ fontSize: "12px", overflow: "hidden" }}>
              {props.car.daysRemaining} days
            </Typography>
          )}
          <IconButton
            sx={{
              padding: "0px",
              marginBottom: "5px",
              color: "grey",
            }}
            onClick={() => setConfirmDialog(true)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
        {(props.status === "inventory" || props.status === "maintenance") && (
          <Button
            variant="outlined"
            sx={{
              marginBottom: "10px",
              width: "100%",
            }}
            onClick={() => setRentDialog(true)}
          >
            Rent Out
          </Button>
        )}
        {(props.status === "inventory" || props.status === "rented") && (
          <Button
            variant="outlined"
            sx={{
              marginBottom: "10px",
              width: "100%",
            }}
            onClick={() => setMaintenanceDialog(true)}
          >
            Maintence
          </Button>
        )}
        {(props.status === "maintenance" || props.status === "rented") && (
          <Button
            variant="outlined"
            sx={{
              width: "100%",
              marginBottom: "10px",
            }}
            onClick={returnCar}
          >
            Return
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
          car={props.car}
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
    </Card>
  );
};

CarItem.propTypes = {
  car: PropTypes.object,
  status: PropTypes.string,
  setFlag: PropTypes.func,
};

export default CarItem;
