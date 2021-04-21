import React from "react";
import logo from "./logo.svg";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Speak } from "./modules/Speak";
import Countries from "./data/ja_countries.json";

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
    <>
      {Countries.map((value) => {
        return (
          <input
            key={value.images}
            type="image"
            id="button"
            src={images.get("./" + value.images)}
            onClick={() => {
              Speak(value.name, "ja");
            }}
          ></input>
        );
      })}
    </>
  );
}

export default App;
