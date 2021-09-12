import React from "react";

import {
  Toolbar,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Slider,
  InputLabel,
} from "@material-ui/core";

import VybratVse from "./VybratVse.jsx";

const BocniMenu = ({ filtr, setFiltr, classes }) => {
  const handleChange = (e) => {
    setFiltr({ ...filtr, [e.target.name]: e.target.checked });
  };

  const handlePoradiChange = (e, newValue) => {
    setFiltr({ ...filtr, poradiNaKand: newValue });
  };

  const handleVekChange = (e, newValue) => {
    setFiltr({ ...filtr, vek: newValue });
  };

  return (
    <Toolbar disableGutters={true} className={classes.bocniMenu}>
      <FormControl component="fieldset" className={classes.bocniFieldset}>
        <InputLabel className={classes.bocniLabel}>POHLAVÍ</InputLabel>
        <VybratVse
          items={["zeny", "muzi"]}
          filtr={filtr}
          setFiltr={setFiltr}
          classes={classes}
        />
        <FormGroup className={classes.bocniCheckBoxGroup}>
          <FormControlLabel
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
        <InputLabel className={classes.bocniLabel}>TITULY</InputLabel>
        <VybratVse
          items={[
            "ing",
            "mgr",
            "bc",
            "mudr",
            "judr",
            "phdr",
            "rndr",
            "paeddr",
            "phd",
            "csc",
            "mba",
            "jiny",
            "zadny",
          ]}
          filtr={filtr}
          setFiltr={setFiltr}
          classes={classes}
        />
        <FormGroup className={classes.bocniCheckBoxGroup}>
          <FormControlLabel
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
          {/* <FormControlLabel
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
            control={
              <Checkbox
                checked={filtr.csc}
                onChange={handleChange}
                name="csc"
                size="small"
              />
            }
            label="CSc."
          /> */}
          <FormControlLabel
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
            className={classes.bocniCheckBoxDvaSloupce}
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
        <InputLabel className={classes.bocniLabel}>
          POŘADÍ NA KANDIDÁTCE
        </InputLabel>
        <FormGroup className={classes.bocniCheckBoxGroup}>
          <Slider
            style={{ width: "85%", marginLeft: "0.3rem" }}
            value={filtr.poradiNaKand}
            onChange={handlePoradiChange}
            min={1}
            max={36}
            valueLabelDisplay="auto"
            color="secondary"
          ></Slider>
        </FormGroup>
      </FormControl>
      <FormControl className={classes.bocniFieldset}>
        <InputLabel className={classes.bocniLabel}>VĚK</InputLabel>
        <FormGroup className={classes.bocniCheckBoxGroup}>
          <Slider
            style={{ width: "85%", marginLeft: "0.3rem" }}
            value={filtr.vek}
            onChange={handleVekChange}
            min={21}
            max={94}
            valueLabelDisplay="auto"
            color="secondary"
          ></Slider>
        </FormGroup>
      </FormControl>
      {filtr.nactenyRok != 2021 && (
        <FormControl component="fieldset" className={classes.bocniFieldset}>
          <InputLabel className={classes.bocniLabel}>
            MANDÁT V ROCE {filtr.nactenyRok}
          </InputLabel>
          <VybratVse
            items={["mandatAno", "mandatPref", "mandatNe"]}
            filtr={filtr}
            setFiltr={setFiltr}
            classes={classes}
          />
          <FormGroup className={classes.bocniCheckBoxGroup}>
            <FormControlLabel
              className={classes.bocniCheckBox}
              control={
                <Checkbox
                  checked={filtr.mandatAno}
                  onChange={handleChange}
                  name="mandatAno"
                  size="small"
                />
              }
              label="získali standardně"
            />
            <FormControlLabel
              className={classes.bocniCheckBox}
              control={
                <Checkbox
                  checked={filtr.mandatPref}
                  onChange={handleChange}
                  name="mandatPref"
                  size="small"
                />
              }
              label="získali díky preferenčním hlasům"
            />
            <FormControlLabel
              className={classes.bocniCheckBox}
              control={
                <Checkbox
                  checked={filtr.mandatNe}
                  onChange={handleChange}
                  name="mandatNe"
                  size="small"
                />
              }
              label="nezískali"
            />
          </FormGroup>
        </FormControl>
      )}
      <FormControl component="fieldset" className={classes.bocniFieldset}>
        <InputLabel className={classes.bocniLabel}>
          VELIKOST BYDLIŠTĚ
        </InputLabel>
        <VybratVse
          items={["do1k", "do10k", "do50k", "nad50k", "praha"]}
          filtr={filtr}
          setFiltr={setFiltr}
          classes={classes}
        />

        <FormGroup className={classes.bocniCheckBoxGroup}>
          <FormControlLabel
            className={classes.bocniCheckBox}
            control={
              <Checkbox
                checked={filtr.do1k}
                onChange={handleChange}
                name="do1k"
                size="small"
              />
            }
            label="do tisíce obyvatel"
          />
          <FormControlLabel
            className={classes.do10k}
            control={
              <Checkbox
                checked={filtr.do10k}
                onChange={handleChange}
                name="do10k"
                size="small"
              />
            }
            label="do 10 tisíc obyvatel"
          />
          <FormControlLabel
            className={classes.do50k}
            control={
              <Checkbox
                checked={filtr.do50k}
                onChange={handleChange}
                name="do50k"
                size="small"
              />
            }
            label="do 50 tisíc obyvatel"
          />
          <FormControlLabel
            className={classes.nad50k}
            control={
              <Checkbox
                checked={filtr.nad50k}
                onChange={handleChange}
                name="nad50k"
                size="small"
              />
            }
            label="nad 50 tisíc obyvatel"
          />
          <FormControlLabel
            className={classes.praha}
            control={
              <Checkbox
                checked={filtr.praha}
                onChange={handleChange}
                name="praha"
                size="small"
              />
            }
            label="Praha"
          />
        </FormGroup>
      </FormControl>
    </Toolbar>
  );
};

export default BocniMenu;
