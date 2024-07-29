// button opens dialog to rent, autocomplete for renter, just keeps track of name.
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Autocomplete,
} from "@mui/material";
import { createFilterOptions } from "@mui/material/Autocomplete";

const RentDialog = (props) => {
  const [renter, setRenter] = useState({ name: "", id: "" });
  const [days, setDays] = useState(0);
  const [renterOptions, setRenterOptions] = useState([{ name: "", id: "" }]);

  const filter = createFilterOptions();

  const fetchRenters = async () => {
    const response = await fetch("/get-renters");
    const data = await response.json();
    setRenterOptions(data);
  };

  useEffect(() => {
    fetchRenters();
  }, []);

  const addNewRenter = async (renterName) => {
    const response = await fetch("/add-new-customer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: renterName,
      }),
    });
    const data = await response.json();
    return data;
  };

  const handleClose = () => {
    props.toggleOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    await fetch("/rent-car", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: props.car.id,
        customerId: renter.id,
        days: days,
      }),
    });
    props.updateStatus("rented");
    handleClose();
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Rent Out</DialogTitle>
        <DialogContent>
          <Autocomplete
            sx={{ marginTop: "5px" }}
            value={renter}
            onChange={async (event, newValue) => {
              if (newValue?.inputValue) {
                const newRenter = await addNewRenter(newValue.inputValue);
                await fetchRenters();
                setRenter(newRenter);
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
            freeSolo
            renderInput={(params) => <TextField {...params} label="Rent to" />}
          />
          <TextField
            autoFocus
            margin="dense"
            value={days}
            onChange={(event) => setDays(event.target.value)}
            type="number"
            label="Number of Days"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RentDialog;
