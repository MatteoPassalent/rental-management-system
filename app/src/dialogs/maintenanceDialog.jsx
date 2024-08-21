import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import PropTypes from "prop-types";

const MaintenanceDialog = (props) => {
  const [days, setDays] = useState("");

  const handleDaysChange = (event) => {
    const value = event.target.value;
    if (value === "" || Number(value) > 0) {
      setDays(value);
    }
  };

  const handleClose = () => {
    props.toggleOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    props.updateStatus("maintenance");
    handleClose();
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Out For Maintenance</DialogTitle>
        <DialogContent>
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
          <Button disabled={!days} type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

MaintenanceDialog.propTypes = {
  open: PropTypes.bool,
  toggleOpen: PropTypes.func,
  updateStatus: PropTypes.func,
};

export default MaintenanceDialog;
