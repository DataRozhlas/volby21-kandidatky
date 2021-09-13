//import "preact/debug";
//import { h, render } from "preact";
import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import App from "./App.jsx";
import "./byeie"; // loučíme se s IE

//render(<App />, document.getElementById("app"));
ReactDOM.render(
  <App
    defaultFiltr={{
      vybranyKraj: 0,
      vybranaNstrana: 0,
      vybranaVstrana: 0,
      nactenyRok: 2021,
      muzi: true,
      zeny: true,
      ing: true,
      mgr: true,
      bc: true,
      mudr: true,
      judr: true,
      phdr: true,
      rndr: true,
      paeddr: true,
      // phd: true,
      // csc: true,
      mba: true,
      jiny: true,
      zadny: true,
      poradiNaKand: [1, 36],
      vek: [21, 94],
      mandatAno: true,
      mandatNe: true,
      mandatPref: true,
      do1k: true,
      do10k: true,
      do50k: true,
      nad50k: true,
      praha: true,
    }}
  />,
  document.getElementById("app")
);

document.getElementById("vek").addEventListener("click", () => {
  document.getElementById("app").remove();
  const newApp = document.createElement("div");
  newApp.setAttribute("id", "app");
  document.getElementById("obal").appendChild(newApp);
  ReactDOM.render(
    <App
      defaultFiltr={{
        vybranyKraj: 0,
        vybranaNstrana: 0,
        vybranaVstrana: 0,
        nactenyRok: 2021,
        muzi: true,
        zeny: true,
        ing: true,
        mgr: true,
        bc: true,
        mudr: true,
        judr: true,
        phdr: true,
        rndr: true,
        paeddr: true,
        // phd: true,
        // csc: true,
        mba: true,
        jiny: true,
        zadny: true,
        poradiNaKand: [1, 36],
        vek: [21, 40],
        mandatAno: true,
        mandatNe: true,
        mandatPref: true,
        do1k: true,
        do10k: true,
        do50k: true,
        nad50k: true,
        praha: true,
      }}
    />,
    document.getElementById("app")
  );
});

document.getElementById("zeny").addEventListener("click", () => {
  document.getElementById("app").remove();
  const newApp = document.createElement("div");
  newApp.setAttribute("id", "app");
  document.getElementById("obal").appendChild(newApp);
  ReactDOM.render(
    <App
      defaultFiltr={{
        vybranyKraj: 0,
        vybranaNstrana: 0,
        vybranaVstrana: 0,
        nactenyRok: 2021,
        muzi: false,
        zeny: true,
        ing: true,
        mgr: true,
        bc: true,
        mudr: true,
        judr: true,
        phdr: true,
        rndr: true,
        paeddr: true,
        // phd: true,
        // csc: true,
        mba: true,
        jiny: true,
        zadny: true,
        poradiNaKand: [1, 36],
        vek: [21, 94],
        mandatAno: true,
        mandatNe: true,
        mandatPref: true,
        do1k: true,
        do10k: true,
        do50k: true,
        nad50k: true,
        praha: true,
      }}
    />,
    document.getElementById("app")
  );
});

document.getElementById("mudr").addEventListener("click", () => {
  document.getElementById("app").remove();
  const newApp = document.createElement("div");
  newApp.setAttribute("id", "app");
  document.getElementById("obal").appendChild(newApp);
  ReactDOM.render(
    <App
      defaultFiltr={{
        vybranyKraj: 0,
        vybranaNstrana: 0,
        vybranaVstrana: 0,
        nactenyRok: 2021,
        muzi: true,
        zeny: true,
        ing: false,
        mgr: false,
        bc: false,
        mudr: true,
        judr: false,
        phdr: false,
        rndr: false,
        paeddr: false,
        // phd: true,
        // csc: true,
        mba: false,
        jiny: false,
        zadny: false,
        poradiNaKand: [1, 36],
        vek: [21, 94],
        mandatAno: true,
        mandatNe: true,
        mandatPref: true,
        do1k: true,
        do10k: true,
        do50k: true,
        nad50k: true,
        praha: true,
      }}
    />,
    document.getElementById("app")
  );
});

if (window.innerWidth < 600) {
  document.getElementById("kandidatky-vek").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-vek-mob.svg">';
  document.getElementById("kandidatky-zeny").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-zeny-mob.svg">';
  document.getElementById("kandidatky-volitelne-zeny").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-volitelne-zeny-mob.svg">';
  document.getElementById("kandidatky-tituly").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-tituly-mob.svg">';
} else {
  document.getElementById("kandidatky-vek").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-vek-des.svg">';
  document.getElementById("kandidatky-zeny").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-zeny-des.svg">';
  document.getElementById("kandidatky-volitelne-zeny").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-volitelne-zeny-des.svg">';
  document.getElementById("kandidatky-tituly").innerHTML =
    '<img class="img" src="https://data.irozhlas.cz/kandidatky-2021/kandidatky-tituly-des.svg">';
}
