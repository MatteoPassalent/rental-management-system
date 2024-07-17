// button opens dialog to rent, autocomplete for renter, just keeps track of name.
import { useState } from "react";
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
  const [open, toggleOpen] = useState(false);

  const filter = createFilterOptions();

  const handleClose = () => {
    toggleOpen(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Add a new Renter</DialogTitle>
        <DialogContent>
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
            sx={{ width: "140px" }}
            freeSolo
            size="small"
            renderInput={(params) => <TextField {...params} label="Rent to" />}
          />
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RentDialog;
