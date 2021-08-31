//import { h, render, Component, Fragment } from "preact";
//import { useEffect, useState } from "preact/compat";
import React, { useState, useEffect } from "react";

import { Container } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";
import Tablica from "./Tablica.jsx";
import HorniMenu from "./HorniMenu.jsx";

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
  const [filtr, setFiltr] = useState({
    changed: false,
    vybranyKraj: 0,
    vybranaNstrana: 0,
    vybranaVstrana: 0,
    rok: 2021,
  });
  const [kandidati, setKandidati] = useState([]);
  const [vybraniKandidati, setVybraniKandidati] = useState([]);

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
    const kandidati = await getData(filtr.rok);
    setKandidati(kandidati);
  }, [filtr.rok]);

  // kdyz se zmeni filtr nebo rok, aktualizuj vybrane kandidaty
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
  }, [filtr, filtr.rok]);

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters={true}>
        <HorniMenu
          filtr={filtr}
          setFiltr={setFiltr}
          ciselniky={ciselniky}
          kandidati={kandidati}
        />
        <Tablica kandidati={kandidati} vybraniKandidati={vybraniKandidati} />
        <p>
          {vybraniKandidati.length} z {kandidati.length} kandidatu
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
