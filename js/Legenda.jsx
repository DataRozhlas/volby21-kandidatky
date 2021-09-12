import { Typography, Container } from "@material-ui/core";
import React from "react";

const Legenda = ({ vybarveneStrany, vybranychKandidatu }) => {
  const pocetVybarvenych = vybarveneStrany.reduce((acc, curr) => {
    return acc + curr.pocet;
  }, 0);
  const legendData =
    vybranychKandidatu > pocetVybarvenych
      ? [...vybarveneStrany, { nazev: "Ostatní", barva: "#349DB2", vstrana: 0 }]
      : vybarveneStrany;
  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly",
      }}
    >
      {legendData.map((s) => {
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
