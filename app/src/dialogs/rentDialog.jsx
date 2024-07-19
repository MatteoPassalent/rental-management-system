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
  const { open, toggleOpen } = props;
  const [renter, setRenter] = useState({ name: "" });
  const [days, setDays] = useState(0);
  const [renterOptions, setRenterOptions] = useState([{ name: "John Doe" }]);

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
        <DialogTitle>Rent Out</DialogTitle>
        <DialogContent>
          <Autocomplete
            sx={{ marginTop: "5px" }}
            value={renter}
            onChange={(event, newValue) => {
              if (newValue && newValue.inputValue) {
                setRenter(newValue);
                setRenterOptions((prev) => [
                  ...prev,
                  { name: newValue.inputValue },
                ]);
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
          <Button type="submit">Add</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default RentDialog;
