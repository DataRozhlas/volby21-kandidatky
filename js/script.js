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
      mvdr: true,
      paeddr: true,
      phd: true,
      csc: true,
      prof: true,
      rsdr: true,
      mba: true,
      jiny: true,
      zadny: true,
      poradiNaKand: [1, 36],
      vek: [21, 94],
      mandatAno: false,
      mandatNe: false,
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

const device = window.innerWidth < 600 ? "mob" : "des";
const path = "https://data.irozhlas.cz/datavis-2021-volby-krouzkovani/";
const alt1 = "Triumf starostů, masakr Pirátů";
const alt2 = "Kroužky přidaly šest poslanců lidovcům, ODS o pět připravily";
const alt3 = "Opakovaní skokani a smolaři v letech 2006–2021";
const alt4 = "Největší skokani v letech 2006–2021";
document.getElementById("krouzkovani-stan-pirati").innerHTML =
  "<img src=" +
  path +
  "krouzkovani-stan-pirati-" +
  device +
  '.svg alt="' +
  alt1 +
  '">';
document.getElementById("krouzkovani-spolu").innerHTML =
  "<img src=" +
  path +
  "krouzkovani-spolu-" +
  device +
  '.svg alt="' +
  alt2 +
  '">';
document.getElementById("krouzkovani-opakovani").innerHTML =
  "<img src=" +
  path +
  "krouzkovani-opakovani-" +
  device +
  '.svg alt="' +
  alt3 +
  '">';
document.getElementById("krouzkovani-top-skoky").innerHTML =
  "<img src=" +
  path +
  "krouzkovani-top-skoky-" +
  device +
  '.svg alt="' +
  alt4 +
  '">';
