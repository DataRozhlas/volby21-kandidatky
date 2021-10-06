import React, { useRef, useEffect } from "react";
import d3 from "./d3Importer.js";
import barvickyZdroj from "./../data/barvicky.json";

import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({
  grafContainer: {
    width: "100%",
    minHeight: window.innerHeight / 1.7,
  },
});

const Graf = ({
  vybraniKandidati,
  isMobile,
  vybraneStrany,
  setVybraneStrany,
}) => {
  const classes = useStyles();

  const containerRef = useRef(null);
  const meritko = vybraniKandidati.length > 856 ? 10 : 1;

  // kolik stran, jež mají definovanou barvičku, je mezi vybranými kandidáty a které to jsou?
  const zjistiVybraneStrany = (vybraniKandidati, barvickyZdroj) => {
    const barvicky = barvickyZdroj.map((d) => Object.assign({}, d));
    const strany = vybraniKandidati
      .reduce((acc, curr) => {
        const barvicka = acc.filter((b) => b.vstrana === curr.v)[0];
        const index = acc.indexOf(barvicka);
        if (index !== -1) {
          const novaBarvicka = { ...barvicka, pocet: barvicka.pocet + 1 };
          acc.splice(index, 1, novaBarvicka);
        }
        return acc;
      }, barvicky)
      .filter((s) => {
        return s.pocet > 0;
      })
      .map((s) => {
        const pocetKulicek = Math.floor(s.pocet / meritko);
        return { ...s, pocet: pocetKulicek };
      });
    console.log(barvicky);
    const pocetVybarvenych = strany.reduce((acc, curr) => {
      return acc + curr.pocet;
    }, 0);
    const result =
      vybraniKandidati.length > pocetVybarvenych
        ? [
            ...strany,
            {
              nazev: "Ostatní",
              barva: "#349DB2",
              vstrana: 0,
              pocet: (vybraniKandidati.length - pocetVybarvenych) / meritko,
            },
          ]
        : strany;
    // console.log(result);
    return result;
  };

  useEffect(() => {
    const kulicky = zjistiVybraneStrany(vybraniKandidati, barvickyZdroj);
    setVybraneStrany(kulicky);
  }, [vybraniKandidati]);

  useEffect(() => {
    d3.selectAll("#graf").remove();
    let destroyFn;
    let nodesFn;
    if (containerRef.current) {
      console.log(vybraneStrany);
      const { destroy, nodes } = GrafGenerator(
        containerRef.current,
        vybraneStrany,
        isMobile
      );
      destroyFn = destroy;
      nodesFn = nodes;
      // console.log(destroyFn);
    }
    //console.log(nodesFn());
    return destroyFn;
  }, [vybraneStrany]);

  // const kulicky = vyrobKulicky(vybraniKandidati, vybraneStrany);}, [vybraneStrany])

  return <div ref={containerRef} className={classes.grafContainer}></div>;
};

export default Graf;
