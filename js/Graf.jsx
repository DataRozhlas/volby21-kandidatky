import React, { useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({});

const vyberKulicky = (vybraniKandidati, vybraniVybraniKandidati) => {
  let meritko;
  vybraniKandidati.length > 1000
    ? (meritko = 50)
    : vybraniKandidati.length > 100
    ? (meritko = 10)
    : (meritko = 1);
  const pocet = Math.floor(vybraniKandidati.length / meritko);
  return Array.apply(null, Array(pocet)).map(function (x, i) {
    return { id: i };
  });
};

const Graf = ({ vybraniKandidati, vybraniVybraniKandidati }) => {
  const classes = useStyles();

  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      //console.log(kulicky);
      const { destroy } = GrafGenerator(containerRef.current, vybraniKandidati);
      destroyFn = destroy;
    }
    return destroyFn;
  }, []);

  return <div ref={containerRef} className={classes.grafContainer}></div>;
};

export default Graf;
