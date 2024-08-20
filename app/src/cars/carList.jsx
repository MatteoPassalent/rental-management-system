import CarItem from "./carItem";
import AddCarDialog from "../dialogs/addCarDialog";
import { useState } from "react";
import { Button } from "@mui/material";
import PropTypes from "prop-types";

const apiUrl = process.env.REACT_APP_API_URL;

const CarList = (props) => {
  const [carDialog, setCarDialog] = useState(false);

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
        className="custom-scrollbar"
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
          <Button
            variant="contained"
            sx={{
              borderRadius: "0px",
              width: "100%",
              marginBottom: "1px",
            }}
            onClick={() => setCarDialog(true)}
          >
            Add Car
          </Button>
        )}
      </ul>
      {carDialog && (
        <AddCarDialog
          open={carDialog}
          toggleOpen={setCarDialog}
          addCar={addCar}
        />
      )}
    </>
  );
};

CarList.propTypes = {
  status: PropTypes.string,
  cars: PropTypes.array,
  setFlag: PropTypes.func,
};

export default CarList;
