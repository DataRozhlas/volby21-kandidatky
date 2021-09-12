//import { h, render, Component, Fragment } from "preact";
//import { useEffect, useState } from "preact/compat";
import React, { useState, useEffect } from "react";

import d3 from "./d3Importer.js";

import { Container, Button, Typography } from "@material-ui/core";
import {
  ThemeProvider,
  createTheme,
  makeStyles,
} from "@material-ui/core/styles";
import EditIcon from "@material-ui/icons/Edit";
import Tablica from "./Tablica.jsx";
import HorniMenu from "./HorniMenu.jsx";
import BocniMenu from "./BocniMenu.jsx";
import Modal from "./Modal.jsx";
import Graf from "./Graf.jsx";

const isMobile = window.innerWidth < 769;

const theme = createTheme({
  palette: {
    primary: {
      main: "#F8F8F8",
    },
    secondary: {
      main: "#3f50b5",
    },
  },
  overrides: {
    MuiButton: {
      textSecondary: {
        "&:hover": {
          backgroundColor: "transparent",
        },
      },
    },
    MuiAppBar: {
      root: {
        boxShadow: "none",
        width: isMobile ? "unset" : "100%",
        marginLeft: isMobile ? "-15px" : null,
        marginRight: isMobile ? "-15px" : null,
        marginBottom: isMobile ? null : "0.8rem",
      },
    },
    MuiFormLabel: {
      root: {
        letterSpacing: "0.1rem",
        "&$focused": {
          color: "rgba(0, 0, 0, 0.54)",
        },
      },
    },
    MuiFormControlLabel: {
      label: { fontSize: "0.85rem" },
    },
    MuiCheckbox: {
      root: { padding: "1px 9px" },
    },
    MuiSlider: {
      valueLabel: {
        "& span": {
          "& span": {
            color: "white",
          },
        },
      },
    },
  },
});

const useStyles = makeStyles({
  largeSelect: {
    flexGrow: 2,
    flexBasis: isMobile ? "100%" : 0,
    marginTop: "0.5rem",
    marginRight: isMobile ? null : "2rem",
  },
  smallSelect: {
    flexGrow: 1,
    flexBasis: isMobile ? "50%" : 0,
    marginTop: "0.5rem",
    marginRight: isMobile ? null : "2rem",
  },
  horniMenu: {
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  bocniMenu: {
    flexDirection: "column",
  },
  bocniFieldset: {
    width: "100%",
    marginTop: "0.7rem",
    marginLeft: "0.3rem",
  },
  bocniCheckBoxGroup: {
    flexDirection: "row",
  },
  bocniCheckBoxDvaSloupce: {
    width: "45%",
  },
  bocniCheckBox: {
    width: "100%",
  },
  bocniLabel: {
    position: "unset",
    transform: "unset",
    fontSize: "0.75rem",
    marginTop: "0.8rem",
  },
  vybratVse: {
    fontSize: "0.65rem",
    paddingLeft: "0rem",
    paddingTop: "0rem",
  },
  tabulka: {
    width: "100%",
    marginTop: isMobile ? null : "1.6rem",
  },
  kolemGrafu: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
  },
});

const dataFormat = (nazev, d) => {
  if (/\d{4}/.test(nazev)) {
    return {
      id: +d.id,
      k: +d.k,
      c: +d.c,
      t1: d.t1 === "" ? undefined : d.t1,
      t2: d.t2 === "" ? undefined : d.t2,
      j: d.j,
      p: d.p,
      a: +d.a,
      s: d.s,
      z: d.z,
      v: +d.v,
      n: +d.n,
      m: +d.m,
      b: d.b,
      o: +d.o,
    };
  } else if (nazev === "vstrany") {
    return {
      ROK: +d.ROK,
      VSTRANA: +d.VSTRANA,
      ZKRATKAV8: d.ZKRATKAV8,
      ZKRATKAV30: d.ZKRATKAV30,
    };
  } else if (nazev === "nstrany") {
    return {
      ROK: +d.ROK,
      VSTRANA: +d.VSTRANA,
      NSTRANA: +d.NSTRANA,
      ZKRATKAN8: d.ZKRATKAN8,
      ZKRATKAN30: d.ZKRATKAN30,
    };
  } else if (nazev === "kraje") {
    return {
      VOLKRAJ: +d.VOLKRAJ,
      NAZVOLKRAJ: d.NAZVOLKRAJ,
    };
  }
};

const getData = async (nazev) => {
  try {
    const response = await fetch(
      `https://data.irozhlas.cz/volby21-kandidatky/data/${nazev}.tsv`
    );
    const text = await response.text();
    const result = await d3.tsvParse(text, (d) => dataFormat(nazev, d));
    return result;
  } catch (error) {
    console.log(error);
  }
};

const filtrNaTituly = (k, titul, filtr) => {
  if (filtr[titul] === true) {
    return true;
  } else if (
    typeof k.t1 !== "undefined" &&
    k.t1.toUpperCase().includes(titul.toUpperCase())
  ) {
    return false;
  } else if (
    typeof k.t2 !== "undefined" &&
    k.t2.toUpperCase().includes(titul.toUpperCase())
  ) {
    return false;
  } else {
    return true;
  }
};

function App() {
  const classes = useStyles();

  const [ciselniky, setCiselniky] = useState({
    roky: [2006, 2010, 2013, 2017, 2021],
    kraje: [],
    nstrany: [],
    vstrany: [],
  });
  const [filtr, setFiltr] = useState({
    vybranyKraj: 0,
    vybranaNstrana: 0,
    vybranaVstrana: 0,
    nactenyRok: 2021,
    muzi: true,
    zeny: true,
    ing: true,
    mgr: true,
    bc: true,
    mudr: true,
    judr: true,
    phdr: true,
    rndr: true,
    paeddr: true,
    phd: true,
    csc: true,
    mba: true,
    jiny: true,
    zadny: true,
    poradiNaKand: [1, 36],
    vek: [21, 94],
    mandatAno: true,
    mandatNe: true,
    mandatPref: true,
    do1k: true,
    do10k: true,
    do50k: true,
    nad50k: true,
    praha: true,
  });
  const [rok, setRok] = useState(2021);
  const [kandidati, setKandidati] = useState([]);
  const [vybraniKandidati, setVybraniKandidati] = useState([]);
  const [vybraniVybraniKandidati, setVybraniVybraniKandidati] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const [vybarveneStrany, setVybarveneStrany] = useState([]);
  // na zacatku nacti data do ciselniku
  useEffect(async () => {
    const kraje = await getData("kraje");
    const nstrany = await getData("nstrany");
    const vstrany = await getData("vstrany");
    setCiselniky({
      ...ciselniky,
      kraje: kraje,
      nstrany: nstrany,
      vstrany: vstrany,
    });
    // setIsLoading(false);
  }, []);

  // kdyz se zmeni rok, nacti data
  useEffect(async () => {
    const vsichni = await getData(rok);
    setKandidati(vsichni);
    setFiltr({ ...filtr, nactenyRok: rok });
  }, [rok]);

  // kdyz se zmeni filtr, aktualizuj vybrane kandidaty
  useEffect(() => {
    if (kandidati.length > 0) {
      console.log("filtruju");
      const vybrani = kandidati
        .filter((k) => filtr.vybranyKraj === 0 || k.k === filtr.vybranyKraj)
        .filter(
          (k) => filtr.vybranaVstrana === 0 || k.v === filtr.vybranaVstrana
        )
        .filter(
          (k) => filtr.vybranaNstrana === 0 || k.n === filtr.vybranaNstrana
        );
      setVybraniKandidati(vybrani);
    }
  }, [filtr]);

  // vybrani vybrani

  useEffect(() => {
    //console.log(vybraniKandidati);
    if (vybraniKandidati.length > 0) {
      console.log("filtruju filtruju");
      const vybraniVybrani = vybraniKandidati
        .filter((k) => filtr.zeny === true || k.s !== "F")
        .filter((k) => filtr.muzi === true || k.s !== "M")
        .filter((k) => filtrNaTituly(k, "ing", filtr))
        .filter((k) => filtrNaTituly(k, "mgr", filtr))
        .filter((k) => filtrNaTituly(k, "bc", filtr))
        .filter((k) => filtrNaTituly(k, "mudr", filtr))
        .filter((k) => filtrNaTituly(k, "judr", filtr))
        .filter((k) => filtrNaTituly(k, "phdr", filtr))
        .filter((k) => filtrNaTituly(k, "rndr", filtr))
        .filter((k) => filtrNaTituly(k, "paeddr", filtr))
        .filter((k) => filtrNaTituly(k, "csc", filtr))
        .filter((k) => filtrNaTituly(k, "mba", filtr))
        .filter((k) => {
          if (filtr.phd === true) {
            return true;
          } else if (
            typeof k.t1 !== "undefined" &&
            k.t1.toUpperCase().includes("PH.D")
          ) {
            return false;
          } else if (
            typeof k.t2 !== "undefined" &&
            k.t2.toUpperCase().includes("PH.D")
          ) {
            return false;
          } else {
            return true;
          }
        })
        .filter(
          (k) =>
            filtr.zadny === true ||
            !(typeof k.t1 === "undefined" && typeof k.t2 === "undefined")
        )
        .filter((k) => {
          if (filtr.jiny === true) {
            return true;
          } else if (
            typeof k.t1 !== "undefined" &&
            !k.t1.toUpperCase().includes("PH.D") &&
            !k.t1.toUpperCase().includes("MBA") &&
            !k.t1.toUpperCase().includes("CSC") &&
            !k.t1.toUpperCase().includes("PAEDDR") &&
            !k.t1.toUpperCase().includes("PH.D") &&
            !k.t1.toUpperCase().includes("RNDR") &&
            !k.t1.toUpperCase().includes("PHDR") &&
            !k.t1.toUpperCase().includes("MUDR") &&
            !k.t1.toUpperCase().includes("BC") &&
            !k.t1.toUpperCase().includes("MGR") &&
            !k.t1.toUpperCase().includes("ING")
          ) {
            return false;
          } else if (
            typeof k.t2 !== "undefined" &&
            !k.t2.toUpperCase().includes("PH.D") &&
            !k.t2.toUpperCase().includes("MBA") &&
            !k.t2.toUpperCase().includes("CSC") &&
            !k.t2.toUpperCase().includes("PAEDDR") &&
            !k.t2.toUpperCase().includes("PH.D") &&
            !k.t2.toUpperCase().includes("RNDR") &&
            !k.t2.toUpperCase().includes("PHDR") &&
            !k.t2.toUpperCase().includes("MUDR") &&
            !k.t2.toUpperCase().includes("BC") &&
            !k.t2.toUpperCase().includes("MGR") &&
            !k.t2.toUpperCase().includes("ING")
          ) {
            return false;
          } else {
            return true;
          }
        })
        .filter(
          (k) => k.c >= filtr.poradiNaKand[0] && k.c <= filtr.poradiNaKand[1]
        )
        .filter((k) => k.a >= filtr.vek[0] && k.a <= filtr.vek[1])
        .filter((k) => filtr.mandatAno === true || k.m !== 1)
        .filter((k) => filtr.mandatNe === true || k.m !== 0)
        .filter((k) => filtr.mandatPref === true || k.m !== 2)
        .filter((k) => filtr.do1k === true || k.o >= 999)
        .filter((k) => filtr.do10k === true || k.o < 1000 || k.o > 9999)
        .filter((k) => filtr.do50k === true || k.o < 10000 || k.o > 49999)
        .filter((k) => filtr.nad50k === true || k.o < 50000 || k.o > 999999)
        .filter((k) => filtr.praha === true || k.o < 999999);
      setVybraniVybraniKandidati(vybraniVybrani);
    }
  }, [
    filtr.muzi,
    filtr.zeny,
    filtr.ing,
    filtr.mgr,
    filtr.bc,
    filtr.mudr,
    filtr.judr,
    filtr.phdr,
    filtr.rndr,
    filtr.paeddr,
    filtr.phd,
    filtr.csc,
    filtr.mba,
    filtr.jiny,
    filtr.zadny,
    filtr.poradiNaKand,
    filtr.vek,
    filtr.mandatAno,
    filtr.mandatNe,
    filtr.mandatPref,
    filtr.do1k,
    filtr.do10k,
    filtr.do50k,
    filtr.nad50k,
    filtr.praha,
    vybraniKandidati,
  ]);

  // modal
  const handleClickOpen = () => {
    setOpen(true);
  };
  const [open, setOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      {/* {!isLoading && ( */}
      <Container disableGutters={true}>
        <HorniMenu
          rok={rok}
          setRok={setRok}
          filtr={filtr}
          setFiltr={setFiltr}
          ciselniky={ciselniky}
          kandidati={kandidati}
          classes={classes}
        />
        {isMobile ? (
          <>
            <Container
              disableGutters
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Button
                onClick={handleClickOpen}
                startIcon={<EditIcon />}
                variant="contained"
                style={{
                  fontSize: "0.65rem",
                  marginTop: "0.75rem",
                  marginBottom: "0.75rem",
                }}
              >
                Prozkoumej kandidáty podle atributů
              </Button>
            </Container>
            {open && (
              <Modal
                filtr={filtr}
                setFiltr={setFiltr}
                open={open}
                setOpen={setOpen}
                classes={classes}
              ></Modal>
            )}
            <Container disableGutters className={classes.kolemGrafu}>
              <Container disableGutters>
                <Typography align="center">
                  <strong>{vybraniVybraniKandidati.length} kandidátů</strong> (z{" "}
                  {vybraniKandidati.length})
                </Typography>
                <Typography align="center">
                  <span style={{ color: "#C8C8C8" }}>{"\u25CF\xa0"}</span>
                  {vybraniKandidati.length > 621
                    ? "1 kulička = 10 kandidátů"
                    : "1 kulička = 1 kandidát"}
                </Typography>
              </Container>
              {vybraniKandidati.length > 0 && (
                <Graf
                  vybraniKandidati={vybraniKandidati}
                  vybraniVybraniKandidati={vybraniVybraniKandidati}
                  isMobile={isMobile}
                  vybarveneStrany={vybarveneStrany}
                  setVybarveneStrany={setVybarveneStrany}
                />
              )}
              <Container disableGutters>
                <></>
              </Container>
            </Container>
          </>
        ) : (
          <Container
            style={{
              display: "flex",
              flexDirection: "row",
              width: "100%",
              padding: 0,
            }}
          >
            <Container style={{ width: "20%" }} disableGutters={true}>
              <BocniMenu filtr={filtr} setFiltr={setFiltr} classes={classes} />
            </Container>
            <Container disableGutters className={classes.kolemGrafu}>
              <Container disableGutters>
                <Typography align="center">
                  <strong>{vybraniVybraniKandidati.length} kandidátů</strong> (
                  {Math.round(
                    (vybraniVybraniKandidati.length / vybraniKandidati.length) *
                      100
                  )}{" "}
                  % z {vybraniKandidati.length})
                </Typography>
                <Typography align="center">
                  <span style={{ color: "#C8C8C8" }}>{"\u25CF\xa0"}</span>
                  {vybraniKandidati.length > 621
                    ? "1 kulička = 10 kandidátů"
                    : "1 kulička = 1 kandidát"}
                </Typography>
              </Container>
              {vybraniKandidati.length > 0 && (
                <Graf
                  vybraniKandidati={vybraniKandidati}
                  vybraniVybraniKandidati={vybraniVybraniKandidati}
                  isMobile={isMobile}
                  vybarveneStrany={vybarveneStrany}
                  setVybarveneStrany={setVybarveneStrany}
                />
              )}
              <Container disableGutters>
                <></>
              </Container>
            </Container>
          </Container>
        )}
        {ciselniky.kraje.length > 0 && ciselniky.nstrany.length > 0 && (
          <Tablica
            vybraniVybraniKandidati={vybraniVybraniKandidati}
            classes={classes}
            isMobile={isMobile}
            ciselniky={ciselniky}
          />
        )}
        {/* <p>{JSON.stringif(filtr)}</p> */}
      </Container>
    </ThemeProvider>
  );
}

export default App;
