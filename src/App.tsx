// 3rd Party modules
import React from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { BrowserRouter as Router, Link } from "react-router-dom";

// Own modules
import { Speak } from "./modules/Speak";

// CSS
import "uikit/dist/css/uikit.min.css";
import "./App.css";

// JSON data
import Countries from "./data/ja_countries.json";

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
    <Router>
      <div className="uk-text-muted">
        {/* Navigation Header */}
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
                  <a data-uk-icon="icon:world; ratio: 1.5" />
                  <div className="uk-navbar-dropdown">
                    <ul className="uk-nav uk-navbar-dropdown-nav">
                      <li>
                        <Link to="/">English</Link>
                      </li>
                      <li>
                        <Link to="/ja">日本語</Link>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Contents */}
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
                    data-uk-icon="icon:play; ratio: 1.5"
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
    </Router>
  );
}

export default App;
