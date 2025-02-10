import { TextField } from "@mui/material";

const Example = (props) => {
  return (
    <TextField
      autoFocus
      margin="dense"
      value={props.keyword}
      onChange={(event) => props.handleKeywordChange(event.target.value)}
      type="text"
      label="Example Keyword!"
      variant="outlined"
      fullWidth
    />
  );
};

export default Example;
