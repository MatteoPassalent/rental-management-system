import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";

const ConfirmDialog = (props) => {
  const handleClose = () => {
    props.toggleOpen(false);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    props.handleDelete();
    handleClose();
  };
  return (
    <Dialog open={props.open} onClose={handleClose}>
      <form onSubmit={handleSubmit}>
        <DialogTitle>Are you sure you want to delete?</DialogTitle>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Delete</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ConfirmDialog;
