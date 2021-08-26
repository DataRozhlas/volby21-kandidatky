//import "preact/debug";
//import { h, render } from "preact";
import React from "react";
import ReactDOM from "react-dom";
import regeneratorRuntime from "regenerator-runtime";
import App from "./App.jsx";
import "./byeie"; // loučíme se s IE

//render(<App />, document.getElementById("app"));
ReactDOM.render(<App />, document.getElementById("app"));
