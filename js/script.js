import "./byeie"; // loučíme se s IE
import "preact/debug";
import { h, render } from "preact";
import App from "./App.jsx";

render(<App />, document.getElementById("app"));
