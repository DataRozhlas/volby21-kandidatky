import React, { useRef, useEffect } from "react";
import d3 from "./d3Importer.js";
import barvickyZdroj from "./../data/barvicky.json";

import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({
  grafContainer: {
    width: "100%",
  },
});

const Graf = ({
  vybraniKandidati,
  vybarveniKandidati,
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
    //console.log(strany);
    const pocetVybarvenych = barvicky.reduce((acc, curr) => {
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
              pocet: Math.floor(
                (vybraniKandidati.length - pocetVybarvenych) / meritko
              ),
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
    d3.selectAll(".graf").remove();
    let destroyFn;
    let nodesFn;
    if (containerRef.current) {
      //console.log(vybraneStrany);
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
    return [destroyFn, nodesFn];
  }, [vybraneStrany]);

  useEffect(() => {
    //const zobrazeniKandidati = d3.selectAll(".kand")._groups;

    // pro každou stranu zjisti, kolik z vybraných nemá být vybarveno
    //console.log(vybraneStrany);
    const vybarvenych = vybraneStrany.map((s) => {
      if (s.vstrana !== 0) {
        return vybarveniKandidati.filter((k) => k.v === s.vstrana).length;
      } else return 0;
    });

    //ostatni
    if (vybarvenych.length > 1 || vybarvenych[0] === 0) {
      vybarvenych[vybarvenych.length - 1] =
        vybarveniKandidati.length -
        vybarvenych.reduce((acc, curr) => acc + curr, 0);
    }
    console.log(vybarvenych);
    //odbarvuj
    vybraneStrany.forEach((s, i) => {
      const odbarvit = s.pocet - Math.floor(vybarvenych[i] / meritko);
      const kandidatikOdbarveni = document.getElementsByClassName(
        `kand ${s.vstrana}`
      );
      const kandidatikOdbarveniArray = Array.from(kandidatikOdbarveni);
      kandidatikOdbarveniArray.sort((a, b) => a.__data__.y - b.__data__.y);
      kandidatikOdbarveniArray.forEach((k) => {
        k.style.fill = s.barva;
      });

      for (i = 0; i < odbarvit; i++) {
        kandidatikOdbarveniArray[i].style.fill = "#C8C8C8";
        // console.log(i);
      }
      //  console.log(odbarvit, s);
    });

    //  console.log(vybarvenych);
  }, [vybraneStrany, vybarveniKandidati]);

  // const kulicky = vyrobKulicky(vybraniKandidati, vybraneStrany);}, [vybraneStrany])

  return (
    <div
      ref={containerRef}
      className={classes.grafContainer}
      style={{
        display: "flex",
        flexWrap: "wrap",
        minHeight: isMobile
          ? window.innerHeight / 1.15
          : window.innerHeight / 1.7,
      }}
    ></div>
  );
};

export default Graf;
