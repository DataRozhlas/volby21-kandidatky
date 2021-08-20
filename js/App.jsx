import { h, render, Component, Fragment } from "preact";
import { useEffect, useState } from "preact/compat";
import { Button } from "@material-ui/core";

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
    const result = await getData(rok);
    setKandidati(result);
  }, [rok]);

  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

export default App;
