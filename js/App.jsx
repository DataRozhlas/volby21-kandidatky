import { h, render, Component, Fragment } from "preact";
import { useEffect, useState } from "preact/compat";
import {
  Container,
  AppBar,
  Toolbar,
  FormControl,
  InputLabel,
  Select,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
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

const roky = [2006, 2010, 2013, 2017];

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
  // const [kraje, setKraje] = useState([]);
  // const [nstrany, setNstrany] = useState([]);
  // const [vstrany, setVstrany] = useState([]);
  const [ciselniky, setCiselniky] = useState({
    kraje: [],
    nstrany: [],
    vstrany: [],
  });
  const [rok, setRok] = useState(2017);
  const [kandidati, setKandidati] = useState([]);
  const [vybraniKandidati, setVybraniKandidati] = useState([]);

  const [filtr, setFiltr] = useState({
    changed: false,
    vybranyKraj: 0,
  });

  // na zacatku nacti ciselniky
  useEffect(async () => {
    const kraje = await getData("kraje");
    const nstrany = await getData("nstrany");
    const vstrany = await getData("vstrany");
    setCiselniky({
      kraje: kraje,
      nstrany: nstrany,
      vstrany: vstrany,
    });
  }, []);

  // kdyz se zmeni rok, nacti kandidaty
  useEffect(async () => {
    const kandidati = await getData(rok);
    setKandidati(kandidati);
  }, [rok]);

  // kdyz se zmeni filtr, vyber kandidaty
  useEffect(() => {
    if (kandidati.length > 0 && filtr.changed) {
      setVybraniKandidati(kandidati.filter((k) => k.k === filtr.vybranyKraj));
    }
  }, [filtr, kandidati]);

  return (
    <ThemeProvider theme={theme}>
      <Container disableGutters={true}>
        <AppBar position="static">
          <Toolbar>
            <FormControl>
              <InputLabel id="select-rok-label">ROK</InputLabel>

              <Select
                native
                id="select-rok"
                labelId="select-rok-label"
                value={rok}
                onChange={(e) => setRok(Number(e.target.value))}
                disableUnderline={true}
              >
                {roky.map((i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-kraj-label">KRAJ</InputLabel>
              <Select
                native
                id="select-kraj"
                labelId="select-kraj-label"
                value={filtr.vybranyKraj}
                onChange={(e) =>
                  setFiltr({
                    ...filtr,
                    changed: true,
                    vybranyKraj: Number(e.target.value),
                  })
                }
                disableUnderline={true}
              >
                <option key={0} value={0}>
                  Všechny
                </option>
                {ciselniky.kraje.map((i) => (
                  <option key={i.VOLKRAJ} value={i.VOLKRAJ}>
                    {i.NAZVOLKRAJ}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="select-vstrana-label">KANDIDÁTKA</InputLabel>
              <Select
                native
                id="select-vstrana"
                labelId="select-vstrana-label"
                value={filtr.vybranaKandidatka}
                onChange={(e) =>
                  setFiltr({
                    ...filtr,
                    changed: true,
                    vybranaVstrana: Number(e.target.value),
                  })
                }
                disableUnderline={true}
              >
                <option key={0} value={0}>
                  Všechny
                </option>
                {ciselniky.vstrany
                  .filter((i) => i.ROK === rok)
                  .map((i) => (
                    <option key={i.VSTRANA} value={i.VSTRANA}>
                      {i.ZKRATKAV30}
                    </option>
                  ))}
              </Select>
            </FormControl>
          </Toolbar>
        </AppBar>
        <p>
          {vybraniKandidati.length} z {kandidati.length} kandidatu
        </p>
      </Container>
    </ThemeProvider>
  );
}

export default App;
