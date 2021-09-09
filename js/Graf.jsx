import React, { useRef, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({
  grafContainer: {
    width: "80%",
  },
  tooltip: {
    position: "absolute",
    textAlign: "center",
    width: "110px",
    padding: "10px",
    font: "12px sans-serif",
    background: "lightsteelblue",
    border: 0,
    borderRadius: "8px",
    pointerEvents: "none",
  },
});

const vyberKulicky = (kandidati, filtr) => {
  let meritko;
  kandidati.length > 1000
    ? (meritko = 50)
    : vybraniKandidati.length > 100
    ? (meritko = 10)
    : (meritko = 1);
  const pocet = Math.floor(kandidati.length / meritko);
  return Array.apply(null, Array(pocet)).map(function (x, i) {
    return { id: i };
  });
};

const Graf = ({ vybraniKandidati, filtr }) => {
  const classes = useStyles();

  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current && vybraniKandidati.length > 0) {
      const kulicky = vyberKulicky(vybraniKandidati, filtr);
      console.log(kulicky);
      const { destroy } = GrafGenerator(containerRef.current, kulicky, classes);
      destroyFn = destroy;
    }
    return destroyFn;
  }, [vybraniKandidati]);

  return <div ref={containerRef} className={classes.grafContainer}></div>;
};

export default Graf;
