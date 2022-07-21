import React, { useState } from "react";
import "./App.css";
import { FxSpot } from "./Components/FxSpot.component";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>FX Spot</h1>
      </header>
      <FxSpot />
    </div>
  );
}

export default App;
