import React from "react";
import UIkit from "uikit";
import "uikit/dist/css/uikit.min.css";

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
    <ul
      className="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s"
      data-uk-sortable="handle: .uk-card"
      data-uk-grid
    >
      {Countries.map((value) => {
        return (
          <li>
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
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
