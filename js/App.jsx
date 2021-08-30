//import { h, render, Component, Fragment } from "preact";
//import { useEffect, useState } from "preact/compat";
import React, { useState, useEffect } from "react";

import {
  Container,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import Tablica from "./Tablica.jsx";

const isMobile = window.innerWidth < 769;

const theme = createTheme({
  palette: {
    primary: {
      main: "#F8F8F8",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none",
        width: isMobile ? "unset" : "100%",
        marginLeft: isMobile ? "-15px" : null,
        marginRight: isMobile ? "-15px" : null,
      },
    },
  },
});

const roky = [2006, 2010, 2013, 2017, 2021];

const getData = async (nazev) => {
  try {
    const response = await fetch(
      `https://data.irozhlas.cz/volby21-kandidatky/data/${nazev}.json`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [ciselniky, setCiselniky] = useState({
    kraje: [],
    nstrany: [],
    vstrany: [],
  });
  const [rok, setRok] = useState(2017);
  const [kandidati, setKandidati] = useState([]);
  const [vybraniKandidati, setVybraniKandidati] = useState([]);

  const [filtr, setFiltr] = useState({
    changed: false,
    vybranyKraj: 0,
    vybranaNstrana: 0,
    vybranaVstrana: 0,
  });

  // na zacatku nacti ciselniky
  useEffect(async () => {
    const kraje = await getData("kraje");
    const nstrany = await getData("nstrany");
    const vstrany = await getData("vstrany");
    setCiselniky({
      kraje: kraje,
      nstrany: nstrany,
      vstrany: vstrany,
    });
  }, []);

  // kdyz se zmeni rok, nacti nove kandidaty
  useEffect(async () => {
    const kandidati = await getData(rok);
    setKandidati(kandidati);
  }, [rok]);

  // kdyz se zmeni filtr, aktualizuj vybrane kandidaty
  useEffect(() => {
    if (kandidati.length > 0 && filtr.changed) {
      setVybraniKandidati(
        kandidati
          .filter((k) => filtr.vybranyKraj === 0 || k.k === filtr.vybranyKraj)
          .filter(
            (k) => filtr.vybranaVstrana === 0 || k.v === filtr.vybranaVstrana
          )
      );
    }
  }, [filtr, rok]);

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters={true}>
        <AppBar position="static">
          <Toolbar>
            <FormControl>
              <InputLabel id="select-rok-label">ROK</InputLabel>

              <Select
                native
                id="select-rok"
                labelId="select-rok-label"
                value={rok}
                onChange={(e) => {
                  setRok(Number(e.target.value));
                  // setFiltr({
                  //   ...filtr,
                  //   vybranyKraj: 0,
                  //   vybranaVstrana: 0,
                  //   vybranaNstrana: 0,
                  // });
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
                  .filter((i) => i.ROK === rok)
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
              <InputLabel id="select-nstrana-label">
                NAVRHUJÍCÍ STRANA
              </InputLabel>
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
                  .filter((i) => i.ROK === rok)
                  .map((i) => (
                    <option key={i.NSTRANA} value={i.NSTRANA}>
                      {i.ZKRATKAN30}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <Tablica kandidati={kandidati} vybraniKandidati={vybraniKandidati} />
        <p>
          {vybraniKandidati.length} z {kandidati.length} kandidatu
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
