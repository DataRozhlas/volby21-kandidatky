import React from "react";

import {
  Toolbar,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const BocniMenu = ({ filtr, setFiltr }) => {
  const handleChange = (e) => {
    setFiltr({ ...filtr, [e.target.name]: e.target.checked });
  };

  return (
    <Toolbar>
      <FormControl
        component="fieldset"
        size="small"
        variant="outlined"
        fullWidth={true}
        margin="dense"
      >
        <FormLabel component="legend">Pohlaví</FormLabel>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filtr.zeny}
                onChange={handleChange}
                name="zeny"
              />
            }
            label="ženy"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={filtr.muzi}
                onChange={handleChange}
                name="muzi"
              />
            }
            label="muži"
          />
        </FormGroup>
      </FormControl>
    </Toolbar>
  );
};

export default BocniMenu;
