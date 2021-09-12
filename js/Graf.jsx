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
  vybraniVybraniKandidati,
  isMobile,
  vybarveneStrany,
  setVybarveneStrany,
}) => {
  const classes = useStyles();

  const containerRef = useRef(null);

  const vyrobKulicky = (
    vybraniKandidati,
    vybraniVybraniKandidati,
    barvickyZdroj,
    setVybarveneStrany
  ) => {
    const meritko = vybraniKandidati.length > 621 ? 10 : 1;
    const barvicky = barvickyZdroj.map((d) => Object.assign({}, d));
    const zobrazCelkem = Math.floor(vybraniKandidati.length / meritko);
    const vybarviCelkem = Math.floor(vybraniVybraniKandidati.length / meritko);

    const kandidatiPodleBarev = vybraniVybraniKandidati
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

    setVybarveneStrany(kandidatiPodleBarev);
    // vytvor barevne
    let kulickyVybarvene = [];
    let counter = 0;
    for (let i = 0; i < kandidatiPodleBarev.length; i++) {
      for (let j = 0; j < kandidatiPodleBarev[i].pocet; j++) {
        kulickyVybarvene.push({
          id: counter,
          col: kandidatiPodleBarev[i].barva,
        });
        counter++;
      }
    }
    //dopln modre
    const doplnitModrych = vybarviCelkem - kulickyVybarvene.length;
    for (let i = 0; i < doplnitModrych; i++) {
      kulickyVybarvene.push({
        id: counter,
        col: "#349DB2",
      });
      counter++;
    }
    // dopln sede
    const doplnitSedych = zobrazCelkem - kulickyVybarvene.length;
    for (let i = 0; i < doplnitSedych; i++) {
      kulickyVybarvene.push({
        id: counter,
        col: "#C8C8C8",
      });
      counter++;
    }
    //console.log(kulickyVybarvene);
    return kulickyVybarvene;
    // return Array.apply(null, Array(zobrazCelkem)).map(function (x, i) {
    //   return { id: i, vyb: i < vybarviCelkem ? true : false, v: x.v };
    // });
  };

  useEffect(() => {
    d3.selectAll("#graf").remove();
    let destroyFn;
    const kulicky = vyrobKulicky(
      vybraniKandidati,
      vybraniVybraniKandidati,
      barvickyZdroj,
      setVybarveneStrany
    );
    //console.log(kulicky);

    if (containerRef.current) {
      //  console.log(kulicky);
      const { destroy } = GrafGenerator(
        containerRef.current,
        kulicky,
        isMobile
      );
      destroyFn = destroy;
    }
    return destroyFn;
  }, [vybraniKandidati, vybraniVybraniKandidati]);

  return <div ref={containerRef} className={classes.grafContainer}></div>;
};

export default Graf;
