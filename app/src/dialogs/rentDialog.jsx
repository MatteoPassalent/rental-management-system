// button opens dialog to rent, autocomplete for customer, just keeps track of name.
import { useState, useEffect, useMemo } from "react";
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
import PropTypes from "prop-types";

const apiUrl = process.env.REACT_APP_API_URL;

const RentDialog = (props) => {
  const [customer, setCustomer] = useState({ name: "", id: "" });
  const [days, setDays] = useState("");
  const [customerOptions, setCustomerOptions] = useState([
    { name: "", id: "" },
  ]);

  const isValid = useMemo(() => {
    return customer?.name && days;
  }, [customer, days]);

  const handleDaysChange = (event) => {
    const value = event.target.value;
    if (value === "" || Number(value) > 0) {
      setDays(value);
    }
  };

  const filter = createFilterOptions();

  const fetchCustomers = async () => {
    const response = await fetch(`${apiUrl}/get-customers`);
    const data = await response.json();
    setCustomerOptions(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const addNewCustomer = async (customerName) => {
    const response = await fetch(`${apiUrl}/add-new-customer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: customerName,
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
    await fetch(`${apiUrl}/rent-car`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        carId: props.car.id,
        customerId: customer.id,
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
            value={customer}
            onChange={async (event, newValue) => {
              if (newValue?.inputValue) {
                const newCustomer = await addNewCustomer(newValue.inputValue);
                await fetchCustomers();
                setCustomer(newCustomer);
              } else {
                setCustomer(newValue);
              }
            }}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);

              const { inputValue } = params;
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
            options={customerOptions}
            getOptionLabel={(option) => {
              if (option.inputValue) {
                return option.inputValue;
              }
              return option.name;
            }}
            renderOption={(items, option) => {
              const { key, ...optionProps } = items;
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
            onChange={handleDaysChange}
            type="number"
            label="Number of Days"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button disabled={!isValid} type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

RentDialog.propTypes = {
  open: PropTypes.bool,
  car: PropTypes.object,
  toggleOpen: PropTypes.func,
  updateStatus: PropTypes.func,
};

export default RentDialog;
