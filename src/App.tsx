import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Speak } from "./modules/Speak";
import japan from "./images/a23.gif";

function App() {
  return (
    <input
      type="image"
      id="button"
      src={japan}
      onClick={() => {
        Speak("Japan");
      }}
    ></input>
  );
}

export default App;
