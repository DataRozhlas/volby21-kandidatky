import "./byeie"; // loučíme se s IE
import "preact/debug";
import { h, render, Component, Fragment } from "preact";
//import { useEffect, useState } from "preact/compat";

function App() {
  return <>Čauky mňauky</>;
}

render(<App />, document.getElementById("app"));
