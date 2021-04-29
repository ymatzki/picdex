import React from "react";
import "uikit/dist/css/uikit.min.css";
import "./App.css";
import { Speak } from "./modules/Speak";
import Countries from "./data/ja_countries.json";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);

declare module "uikit/dist/js/uikit-icons";

function importAll(r: __WebpackModuleApi.RequireContext) {
  let images = new Map<string, any>();
  r.keys().map((value) => {
    images.set(value, r(value).default);
  });
  return images;
}

function App() {
  const images = importAll(require.context("./images", false, /\.(gif)$/));
  const countries = Countries.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div className="uk-text-muted">
      <div className="uk-panel uk-padding uk-background-muted">
        <a className="uk-logo uk-text-emphasis" href="">
          Picdex
        </a>
      </div>
      <div className="uk-container uk-container-expand">
        <ul
          className="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s"
          data-uk-sortable="handle: .uk-card"
          data-uk-grid
        >
          {countries.map((value) => {
            return (
              <div
                className="uk-card uk-card-default uk-card-body uk-text-center"
                key={value.images}
              >
                <input
                  type="image"
                  id="button"
                  src={images.get("./" + value.images)}
                ></input>
                <div>{value.name}</div>
                <a
                  data-uk-icon="play"
                  onClick={() => {
                    Speak(value.name, "ja");
                  }}
                ></a>
              </div>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
