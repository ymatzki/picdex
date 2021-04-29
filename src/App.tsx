import React from "react";
import "uikit/dist/css/uikit.min.css";
import "./App.css";
import { Speak } from "./modules/Speak";
import Countries from "./data/ja_countries.json";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
UIkit.use(Icons);

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
      <div className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <div className="uk-panel uk-padding uk-background-muted">
            <a className="uk-logo uk-text-emphasis" href="">
              Picdex
            </a>
          </div>
        </div>
        <div className="uk-navbar-right">
          <div className="uk-panel uk-padding uk-background-muted">
            <ul className="uk-navbar-nav">
              <li>
                <a data-uk-icon="icon:world; ratio: 2" />
                <div className="uk-navbar-dropdown">
                  <ul className="uk-nav uk-navbar-dropdown-nav">
                    <li>
                      <a href="/">English</a>
                    </li>
                    <li>
                      <a href="/ja">日本語</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="uk-container uk-container-expand">
        <div
          className="uk-grid-small uk-child-width-1-2 uk-child-width-1-5@s"
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
                  onClick={() => {
                    Speak(value.name, "ja");
                  }}
                ></input>
                <div>{value.name}</div>
                <a
                  data-uk-icon="icon:play; ratio: 2"
                  onClick={() => {
                    Speak(value.name, "ja");
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default App;
