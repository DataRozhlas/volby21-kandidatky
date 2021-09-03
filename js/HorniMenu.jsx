import React from "react";

import {
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";

const HorniMenu = ({
  rok,
  setRok,
  filtr,
  setFiltr,
  ciselniky,
  kandidati,
  classes,
}) => {
  return (
    <AppBar position="static">
      <Toolbar className={classes.horniMenu}>
        <FormControl className={classes.smallSelect}>
          <InputLabel id="select-rok-label">ROK</InputLabel>

          <Select
            native
            id="select-rok"
            labelId="select-rok-label"
            value={rok}
            onChange={(e) => {
              setRok(Number(e.target.value));
              setFiltr({
                ...filtr,
                vybranaNstrana: 0,
              });
            }}
            disableUnderline={true}
          >
            {ciselniky.roky
              .filter(
                (r) =>
                  filtr.vybranaVstrana === 0 || //kdyz neni vybrana strana, ukaz vsechny roky
                  ciselniky.vstrany //kdyz je vybrana strana, koukni se do ciselniku a ukaz jen roky, kdy kandidovala

                    .filter((s) => s.VSTRANA === filtr.vybranaVstrana)
                    .map((s) => s.ROK)
                    .includes(r)
              )
              .map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
          </Select>
        </FormControl>
        <FormControl className={classes.smallSelect}>
          <InputLabel id="select-kraj-label">KRAJ</InputLabel>
          <Select
            native
            id="select-kraj"
            labelId="select-kraj-label"
            value={filtr.vybranyKraj}
            onChange={(e) =>
              setFiltr({
                ...filtr,
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
                  filtr.vybranaVstrana === 0 || //kdyz neni vybrana strana, ukaz vsechny kraje
                  kandidati //kdyz je vybrana strana, koukni se do ciselniku a ukaz jen kraje, kde kandidovala
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

        <FormControl className={classes.largeSelect}>
          <InputLabel id="select-vstrana-label">VOLEBNÍ STRANA</InputLabel>
          <Select
            native
            id="select-vstrana"
            labelId="select-vstrana-label"
            value={filtr.vybranaKandidatka}
            onChange={(e) =>
              setFiltr({
                ...filtr,
                vybranaVstrana: Number(e.target.value),
                vybranaNstrana: 0,
              })
            }
            disableUnderline={true}
          >
            <option key={0} value={0}>
              Všechny
            </option>
            {ciselniky.vstrany
              .filter((i) => i.ROK === rok) // jen volební strany z aktuálně vybraného roku
              .filter(
                (i) =>
                  filtr.vybranyKraj === 0 || // pokud není vybraný žádný kraj, ukaž všechny strany
                  kandidati // jinak se podívej na kandidáty
                    .filter((k) => k.k === filtr.vybranyKraj) // z vybraného kraje
                    .map((k) => k.v)
                    .includes(i.VSTRANA) // a ukaž jen vstrany, které se tam vyskytují
              )
              .map((i) => (
                <option key={i.VSTRANA} value={i.VSTRANA}>
                  {i.ZKRATKAV30}
                </option>
              ))}
          </Select>
        </FormControl>
        {[338, 1327, 1350].includes(filtr.vybranaVstrana) ? (
          <FormControl className={classes.largeSelect}>
            <InputLabel id="select-nstrana-label">NAVRHUJÍCÍ STRANA</InputLabel>
            <Select
              native
              id="select-nstrana"
              labelId="select-nstrana-label"
              value={filtr.vybranaNstrana}
              onChange={(e) =>
                setFiltr({
                  ...filtr,
                  vybranaNstrana: Number(e.target.value),
                })
              }
              disableUnderline={true}
            >
              <option key={0} value={0}>
                Všechny
              </option>
              {ciselniky.nstrany
                .filter((s) => s.ROK === rok)
                .filter((s) => s.VSTRANA === filtr.vybranaVstrana)
                .map((i) => (
                  <option key={i.NSTRANA} value={i.NSTRANA}>
                    {i.ZKRATKAN30}
                  </option>
                ))}
            </Select>
          </FormControl>
        ) : (
          <div className={classes.largeSelect}></div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default HorniMenu;
