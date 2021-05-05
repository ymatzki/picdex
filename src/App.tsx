// 3rd Party modules
import React, { useMemo, useEffect, useRef } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { Link, useLocation } from "react-router-dom";

// Own modules
import { Speak } from "./modules/Speak";

// CSS
import "uikit/dist/css/uikit.min.css";
import "./App.css";

// JSON data
import Countries from "./data/countries.json";

UIkit.use(Icons);

function importAll(r: __WebpackModuleApi.RequireContext) {
  let images = new Map<string, any>();
  r.keys().map((value) => {
    images.set(value, r(value).default);
  });
  return images;
}

function App() {
  const router = useRef(null);
  const location = useLocation();
    
  const l = useMemo((): { lang: "en" | "ja"; disp: string } => {
    window.gtag("config", "G-MW2MMVNHCB", {
      page_path: location.pathname,
    });
    switch (location.pathname) {
      case "/ja": {
        return { lang: "ja", disp: "日本語" };
      }
    }
    return { lang: "en", disp: "English" };
  }, [location]);

  const images = importAll(require.context("./images", false, /\.(gif)$/));

  const countries = Countries.sort((a, b) => {
    return getNameByLang(a.name, "en").localeCompare(
      getNameByLang(b.name, "en")
    );
  }).map((val) => {
    return { images: val.images, name: getNameByLang(val.name, l.lang) };
  });

  return (
    <div className="uk-text-muted">
      {/* Navigation Header */}
      <div className="uk-navbar-container" data-uk-navbar data-uk-sticky>
        <div className="uk-navbar-left">
          <div className="uk-panel uk-padding uk-padding-remove-vertical uk-background-muted">
            <a className="uk-logo uk-text-emphasis" href="">
              pivodex
            </a>
          </div>
        </div>
        <div className="uk-navbar-right">
          <div className="uk-panel uk-padding uk-padding-remove-vertical uk-background-muted">
            <div className="uk-flex">
              <div className="uk-flex uk-flex-middle">{l.disp}</div>
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
                    Speak(value.name, l.lang);
                  }}
                ></input>
                <div>{value.name}</div>
                <a
                  data-uk-icon="icon:play; ratio: 1.5"
                  onClick={() => {
                    Speak(value.name, l.lang);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="uk-padding-small uk-text-center">
        <small>&copy; 2021 ymatzki All Rights Reserved</small>
      </div>
    </div>
  );
}

export default App;

const getNameByLang = <S, T extends keyof S>(obj: S, key: T) => {
  return obj[key];
};
