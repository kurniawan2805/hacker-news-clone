import React from "react";
import ReactDOM from "react-dom";

import Data from "./components/Data";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Data />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
