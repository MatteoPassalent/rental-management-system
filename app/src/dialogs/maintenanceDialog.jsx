// button opens dialog to rent, autocomplete for renter, just keeps track of name.
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const MaintenanceDialog = (props) => {
  const { open2, toggleOpen2 } = props;
  const [days, setDays] = useState(0);

  const handleClose = () => {
    toggleOpen2(false);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    handleClose();
  };
  return (
    <Dialog open={open2} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Out For Maintenance</DialogTitle>
        <DialogContent>
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

export default MaintenanceDialog;
