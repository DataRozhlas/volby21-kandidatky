import React, { useRef, useEffect } from "react";

import { Container } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import GrafGenerator from "./GrafGenerator.jsx";

const useStyles = makeStyles({
  grafContainer: {
    width: "80%",
  },
});

const Graf = ({ kandidati, vybraniKandidati, filtr }) => {
  const classes = useStyles();

  const containerRef = useRef(null);

  useEffect(() => {
    let destroyFn;

    if (containerRef.current) {
      const { destroy } = GrafGenerator(
        containerRef.current,
        kandidati,
        vybraniKandidati,
        filtr
      );
      destroyFn = destroy;
    }
    return destroyFn;
  }, []);

  return (
    <Container ref={containerRef} className={classes.grafContainer}>
      graf
    </Container>
  );
};

export default Graf;
