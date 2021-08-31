import React from "react";

import {
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

const roky = [2006, 2010, 2013, 2017, 2021];

const HorniMenu = ({ filtr, setFiltr, ciselniky, kandidati }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <FormControl>
          <InputLabel id="select-rok-label">ROK</InputLabel>

          <Select
            native
            id="select-rok"
            labelId="select-rok-label"
            value={filtr.rok}
            onChange={(e) => {
              setFiltr({
                ...filtr,
                changed: true,
                rok: Number(e.target.value),
              });
            }}
            disableUnderline={true}
          >
            {roky
              .filter(
                (r) =>
                  filtr.vybranaNstrana === 0 ||
                  ciselniky.nstrany.map((s) => s.ROK).includes(r)
              )
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-kraj-label">KRAJ</InputLabel>
          <Select
            native
            id="select-kraj"
            labelId="select-kraj-label"
            value={filtr.vybranyKraj}
            onChange={(e) =>
              setFiltr({
                ...filtr,
                changed: true,
                vybranyKraj: Number(e.target.value),
              })
            }
            disableUnderline={true}
          >
            <option key={0} value={0}>
              Všechny
            </option>
            {ciselniky.kraje
              .filter(
                (i) =>
                  filtr.vybranaVstrana === 0 ||
                  kandidati
                    .filter((k) => k.v === filtr.vybranaVstrana)
                    .map((k) => k.k)
                    .includes(i.VOLKRAJ)
              )
              .map((i) => (
                <option key={i.VOLKRAJ} value={i.VOLKRAJ}>
                  {i.NAZVOLKRAJ}
                </option>
              ))}
          </Select>
        </FormControl>

        <FormControl>
          <InputLabel id="select-vstrana-label">KANDIDÁTKA</InputLabel>
          <Select
            native
            id="select-vstrana"
            labelId="select-vstrana-label"
            value={filtr.vybranaKandidatka}
            onChange={(e) =>
              setFiltr({
                ...filtr,
                changed: true,
                vybranaVstrana: Number(e.target.value),
              })
            }
            disableUnderline={true}
          >
            <option key={0} value={0}>
              Všechny
            </option>
            {ciselniky.vstrany
              .filter((i) => i.ROK === filtr.rok)
              .filter(
                (i) =>
                  filtr.vybranyKraj === 0 ||
                  kandidati
                    .filter((k) => k.k === filtr.vybranyKraj)
                    .map((k) => k.v)
                    .includes(i.VSTRANA)
              )
              .map((i) => (
                <option key={i.VSTRANA} value={i.VSTRANA}>
                  {i.ZKRATKAV30}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl>
          <InputLabel id="select-nstrana-label">NAVRHUJÍCÍ STRANA</InputLabel>
          <Select
            native
            id="select-nstrana"
            labelId="select-nstrana-label"
            value={filtr.vybranaNstrana}
            onChange={(e) =>
              setFiltr({
                ...filtr,
                changed: true,
                vybranaNstrana: Number(e.target.value),
              })
            }
            disableUnderline={true}
          >
            <option key={0} value={0}>
              Všechny
            </option>
            {ciselniky.nstrany
              .filter((i) => i.ROK === filtr.rok)
              .map((i) => (
                <option key={i.NSTRANA} value={i.NSTRANA}>
                  {i.ZKRATKAN30}
                </option>
              ))}
          </Select>
        </FormControl>
      </Toolbar>
    </AppBar>
  );
};

export default HorniMenu;
