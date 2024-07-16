import {
  Autocomplete,
  Card,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";
import { useState } from "react";

const CarItem = () => {
  const filter = createFilterOptions();
  const [renter, setRenter] = useState(null);
  const [renterOptions, setRenterOptions] = useState([]);
  const [open, toggleOpen] = useState(false);
  const [dialogValue, setDialogValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    car: "",
  });

  const handleClose = () => {
    setDialogValue({
      name: "",
      email: "",
      phone: "",
      address: "",
      car: "",
    });
    toggleOpen(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setRenter({
      name: dialogValue.name,
      email: dialogValue.email,
      phone: dialogValue.phone,
      address: dialogValue.address,
      car: dialogValue.car,
    });
    setRenterOptions((prev) => [...prev, dialogValue]);
    handleClose();
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
      <div style={{ marginRight: "15px" }}>
        <Typography>Make: </Typography>
        <Typography>Model: </Typography>
        <Typography>Year: </Typography>
        <Typography>Colour: </Typography>
        <Typography>License Plate: </Typography>
      </div>
      <div style={{ marginRight: "20px" }}>
        <Typography>Toyota</Typography>
        <Typography>Corolla</Typography>
        <Typography>2021</Typography>
        <Typography>Black</Typography>
        <Typography>ABC123</Typography>
      </div>
      <div>
        <Autocomplete
          value={renter}
          onChange={(event, newValue) => {
            if (newValue && newValue.inputValue) {
              setTimeout(() => {
                toggleOpen(true);
                setDialogValue({
                  name: newValue.inputValue,
                  email: "",
                  phone: "",
                  address: "",
                  car: "",
                });
              });
            } else {
              setRenter(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);

            const { inputValue } = params;
            // Suggest the creation of a new value
            const isExisting = options.some(
              (option) => inputValue === option.name
            );
            if (inputValue !== "" && !isExisting) {
              filtered.push({
                inputValue,
                name: `Add "${inputValue}"`,
              });
            }

            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          options={renterOptions}
          getOptionLabel={(option) => {
            if (option.inputValue) {
              return option.inputValue;
            }
            return option.name;
          }}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <li key={key} {...optionProps}>
                {option.name}
              </li>
            );
          }}
          sx={{ width: "150px" }}
          freeSolo
          size="small"
          renderInput={(params) => <TextField {...params} label="Rent to" />}
        />
        <Dialog open={open} onClose={handleClose}>
          <form onSubmit={handleSubmit}>
            <DialogTitle>Add a new Renter</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                value={dialogValue.name}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    name: event.target.value,
                  })
                }
                label="Name"
                variant="standard"
              />
              <TextField
                margin="dense"
                value={dialogValue.email}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    email: event.target.value,
                  })
                }
                label="email"
                type="text"
                variant="standard"
              />
              <TextField
                margin="dense"
                value={dialogValue.phone}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    phone: event.target.value,
                  })
                }
                label="phone"
                type="text"
                variant="standard"
              />
              <TextField
                margin="dense"
                value={dialogValue.address}
                onChange={(event) =>
                  setDialogValue({
                    ...dialogValue,
                    address: event.target.value,
                  })
                }
                label="address"
                type="text"
                variant="standard"
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Add</Button>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </Card>
  );
};

export default CarItem;
