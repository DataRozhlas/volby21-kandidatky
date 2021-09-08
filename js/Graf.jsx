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

const Graf = ({ kandidati, filtr }) => {
  const classes = useStyles();

  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current && kandidati.length > 0) {
      const { destroy } = GrafGenerator(
        containerRef.current,
        kandidati,
        filtr,
        classes
      );
      destroyFn = destroy;
    }
    return destroyFn;
  }, [filtr]);

  return <div ref={containerRef} className={classes.grafContainer}></div>;
};

export default Graf;
