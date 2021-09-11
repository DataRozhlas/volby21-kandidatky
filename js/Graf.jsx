import React, { useRef, useEffect } from "react";
import d3 from "./d3Importer.js";

import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({
  grafContainer: {
    width: "100%",
    minHeight: window.innerHeight / 2,
  },
});

const vyrobKulicky = (vybraniKandidati, vybraniVybraniKandidati) => {
  let meritko;
  vybraniKandidati.length > 621 ? (meritko = 10) : (meritko = 1);
  const pocet = Math.floor(vybraniKandidati.length / meritko);
  const vybranych = Math.floor(vybraniVybraniKandidati.length / meritko);
  return Array.apply(null, Array(pocet)).map(function (x, i) {
    return { id: i, vyb: i < vybranych ? true : false };
  });
};

const Graf = ({ vybraniKandidati, vybraniVybraniKandidati, isMobile }) => {
  const classes = useStyles();

  const containerRef = useRef(null);

  useEffect(() => {
    d3.selectAll("#graf").remove();
    let destroyFn;
    const kulicky = vyrobKulicky(vybraniKandidati, vybraniVybraniKandidati);
    //console.log(kulicky);

    if (containerRef.current) {
      //console.log(kulicky);
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
