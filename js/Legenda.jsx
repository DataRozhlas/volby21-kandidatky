import { Typography, Container } from "@material-ui/core";
import React from "react";

const Legenda = ({ vybraneStrany }) => {
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {vybraneStrany.map((s) => {
        return (
          <Typography key={s.vstrana}>
            <span style={{ color: s.barva }}>{"\u25CF\xa0"}</span>
            {s.nazev}
          </Typography>
        );
      })}
    </Container>
  );
};

export default Legenda;
