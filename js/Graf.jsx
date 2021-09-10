import React, { useRef, useEffect } from "react";
import d3 from "./d3Importer.js";

import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({
  grafContainer: {
    width: "100%",
  },
});

const vyrobKulicky = (vybraniKandidati, vybraniVybraniKandidati) => {
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
    d3.selectAll("#graf").remove();
    let destroyFn;
    const kulicky = vyrobKulicky(vybraniKandidati, vybraniVybraniKandidati);
    console.log(kulicky);

    if (containerRef.current) {
      //console.log(kulicky);
      const { destroy } = GrafGenerator(containerRef.current, kulicky);
      destroyFn = destroy;
    }
    return destroyFn;
  }, [vybraniKandidati, vybraniVybraniKandidati]);

  return <div ref={containerRef} className={classes.grafContainer}></div>;
};

export default Graf;
