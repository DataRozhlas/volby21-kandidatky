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
      phd: true,
      csc: true,
      prof: true,
      rsdr: true,
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
