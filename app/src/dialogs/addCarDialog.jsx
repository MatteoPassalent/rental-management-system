import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
} from "@mui/material";

const AddCarDialog = (props) => {
  const [car, setCar] = useState({
    make: "",
    model: "",
    year: "",
    color: "",
    licensePlate: "",
  });

  const handleClose = () => {
    props.toggleOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    props.addCar(car);
    handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a New Car</DialogTitle>
        <DialogContent>
          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                value={car.make}
                onChange={(event) =>
                  setCar({ ...car, make: event.target.value })
                }
                type="text"
                label="Make"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                value={car.model}
                onChange={(event) =>
                  setCar({ ...car, model: event.target.value })
                }
                type="text"
                label="Model"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                value={car.year}
                onChange={(event) =>
                  setCar({ ...car, year: event.target.value })
                }
                type="text"
                label="Year"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                value={car.color}
                onChange={(event) =>
                  setCar({ ...car, color: event.target.value })
                }
                type="text"
                label="Color"
                variant="outlined"
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                value={car.licensePlate}
                onChange={(event) =>
                  setCar({ ...car, licensePlate: event.target.value })
                }
                type="text"
                label="License Plate"
                variant="outlined"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddCarDialog;
