import CarItem from "./carItem";
import AddCarDialog from "../dialogs/addCarDialog";
import { useState } from "react";
import { Button } from "@mui/material";

const apiUrl = process.env.REACT_APP_API_URL;

const CarList = (props) => {
  const [carDialog, toggleCarDialog] = useState(false);

  const addCar = async (car) => {
    await fetch(`${apiUrl}/add-car`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(car),
    }).then(() => {
      props.setFlag((prev) => !prev);
    });
  };

  return (
    <>
      <ul
        style={{
          width: "100%",
          padding: "0",
          margin: "0",
          overflowY: "auto",
          overflowX: "hidden",
        }}
      >
        {props.cars?.map((car) => (
          <CarItem
            key={car.id}
            car={car}
            status={props.status}
            setFlag={props.setFlag}
          />
        ))}
        {props.status === "inventory" && (
          <li>
            <Button
              variant="contained"
              color="inherit"
              sx={{
                marginRight: "10px",
                width: "100%",
                backgroundColor: "#B4C1CC",
                marginBottom: "5px",
              }}
              onClick={() => toggleCarDialog(true)}
            >
              Add Car
            </Button>
          </li>
        )}
      </ul>
      {carDialog && (
        <AddCarDialog
          open={carDialog}
          toggleOpen={toggleCarDialog}
          addCar={addCar}
        />
      )}
    </>
  );
};

export default CarList;
