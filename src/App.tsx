import React from "react";
import "uikit";
import "uikit/dist/css/uikit.min.css";

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
    <div className="uk-text-muted">
      <nav className="uk-container uk-container-expand">
        <div className="uk-navbar">
          <div className="uk-navbar-left">
            <h1 className="uk-heading-small uk-logo">Picdex</h1>
          </div>
        </div>
      </nav>
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s"
          data-uk-sortable="handle: .uk-card"
          data-uk-grid
        >
          {Countries.map((value) => {
            return (
              <div
                className="uk-card uk-card-default uk-card-body uk-text-center"
                key={value.images}
              >
                <input
                  type="image"
                  id="button"
                  src={images.get("./" + value.images)}
                  onClick={() => {
                    Speak(value.name, "ja");
                  }}
                ></input>
                <div>{value.name}</div>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
