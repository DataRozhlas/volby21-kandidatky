import React from "react";

import {
  Toolbar,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";

const BocniMenu = ({ filtr, setFiltr, classes }) => {
  const handleChange = (e) => {
    setFiltr({ ...filtr, [e.target.name]: e.target.checked });
  };

  return (
    <Toolbar>
      <FormControl component="fieldset">
        <FormLabel component="legend">Pohlaví</FormLabel>

        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={filtr.zeny}
                onChange={handleChange}
                name="zeny"
                size="small"
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
                size="small"
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
