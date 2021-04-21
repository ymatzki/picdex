import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Speak } from "./modules/Speak";

function importAll(r: __WebpackModuleApi.RequireContext) {
  let images = new Map<string, any>();
  r.keys().map((value) => {
    images.set(value, r(value).default);
  });
  return images;
}

function App() {
  const images = importAll(require.context("./images", false, /\.(gif)$/));
  return (
    <input
      type="image"
      id="button"
      src={images.get("./a11.gif")}
      onClick={() => {
        Speak("Japan");
      }}
    ></input>
  );
}

export default App;
