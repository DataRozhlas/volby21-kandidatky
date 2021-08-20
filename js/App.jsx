import { h, render, Component, Fragment } from "preact";
import { useEffect, useState } from "preact/compat";
import { Container, AppBar } from "@material-ui/core";
import {
  makeStyles,
  ThemeProvider,
  createTheme,
} from "@material-ui/core/styles";

const isMobile = window.innerWidth < 769;

const theme = createTheme({
  palette: {
    primary: {
      main: "#F8F8F8",
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "none",
        width: isMobile ? "unset" : "100%",
        marginLeft: isMobile ? "-15px" : null,
        marginRight: isMobile ? "-15px" : null,
      },
    },
  },
});

const getData = async (nazev) => {
  try {
    const response = await fetch(
      `https://data.irozhlas.cz/volby21-kandidatky/data/${nazev}.json`
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [kraje, setKraje] = useState([]);
  const [nstrany, setNstrany] = useState([]);
  const [vstrany, setVstrany] = useState([]);
  const [rok, setRok] = useState(2017);
  const [kandidati, setKandidati] = useState([]);

  useEffect(async () => {
    const kraje = await getData("kraje");
    const nstrany = await getData("nstrany");
    const vstrany = await getData("vstrany");
    setKraje(kraje);
    setNstrany(nstrany);
    setVstrany(vstrany);
  }, []);

  useEffect(async () => {
    const kandidati = await getData(rok);
    setKandidati(kandidati);
  }, [rok]);

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters={true}>
        <AppBar position="static">Ahoj</AppBar>
      </Container>
    </ThemeProvider>
  );
}

export default App;
