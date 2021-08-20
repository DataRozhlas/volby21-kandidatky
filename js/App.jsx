import { h, render, Component, Fragment } from "preact";
import { useEffect, useState } from "preact/compat";
import { Button } from "@material-ui/core";

function App() {
  return (
    <Button variant="contained" color="primary">
      Hello World
    </Button>
  );
}

export default App;
