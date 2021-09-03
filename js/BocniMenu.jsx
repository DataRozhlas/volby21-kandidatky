import React from "react";

import {
  Toolbar,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
} from "@material-ui/core";

const BocniMenu = ({ filtr, setFiltr, classes }) => {
  const handleChange = (e) => {
    setFiltr({ ...filtr, [e.target.name]: e.target.checked });
  };

  const handleSliderChange = (e, newValue) => {
    setFiltr({ ...filtr, poradiNaKand: newValue });
  };

  return (
    <Toolbar disableGutters={true} className={classes.bocniMenu}>
      <FormControl component="fieldset" className={classes.bocniFieldset}>
        <FormLabel component="legend">Pohlaví</FormLabel>

        <FormGroup className={classes.bocniCheckBoxGroup}>
          <FormControlLabel
            className={classes.bocniCheckBox}
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
            className={classes.bocniCheckBox}
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
      <FormControl component="fieldset" className={classes.bocniFieldset}>
        <FormLabel component="legend">Tituly</FormLabel>

        <FormGroup className={classes.bocniCheckBoxGroup}>
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.ing}
                onChange={handleChange}
                name="ing"
                size="small"
              />
            }
            label="Ing."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.mgr}
                onChange={handleChange}
                name="mgr"
                size="small"
              />
            }
            label="Mgr."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.bc}
                onChange={handleChange}
                name="bc"
                size="small"
              />
            }
            label="Bc."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.mudr}
                onChange={handleChange}
                name="mudr"
                size="small"
              />
            }
            label="MUDr."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.judr}
                onChange={handleChange}
                name="judr"
                size="small"
              />
            }
            label="JUDr."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.phdr}
                onChange={handleChange}
                name="phdr"
                size="small"
              />
            }
            label="PhDr."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.rndr}
                onChange={handleChange}
                name="rndr"
                size="small"
              />
            }
            label="RNDr."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.paeddr}
                onChange={handleChange}
                name="paeddr"
                size="small"
              />
            }
            label="PaedDr."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.phd}
                onChange={handleChange}
                name="phd"
                size="small"
              />
            }
            label="Ph.D."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.csc}
                onChange={handleChange}
                name="csc"
                size="small"
              />
            }
            label="CSc."
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.mba}
                onChange={handleChange}
                name="mba"
                size="small"
              />
            }
            label="MBA"
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.jiny}
                onChange={handleChange}
                name="jiny"
                size="small"
              />
            }
            label="jiný"
          />
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.zadny}
                onChange={handleChange}
                name="zadny"
                size="small"
              />
            }
            label="žádný"
          />
        </FormGroup>
      </FormControl>
      <FormControl className={classes.bocniFieldset}>
        <FormLabel component="legend">Pořadí na kandidátce</FormLabel>
        <FormGroup className={classes.bocniCheckBoxGroup}>
          <Slider
            style={{ width: "85%", marginLeft: "0.3rem" }}
            value={filtr.poradiNaKand}
            onChange={handleSliderChange}
            min={1}
            max={36}
            valueLabelDisplay="auto"
            color="secondary"
          ></Slider>
        </FormGroup>
      </FormControl>
    </Toolbar>
  );
};

export default BocniMenu;
