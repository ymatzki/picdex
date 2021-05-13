// 3rd Party modules
import React, { useMemo, useEffect, useRef, ReactElement } from "react";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";

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
  return (
    <Router>
      <Content />
    </Router>
  );
}

function Content() {
  const location = useLocation();
  const measurementId = "G-MW2MMVNHCB";

  useEffect(() => {
    initializeGA(measurementId);
    if (!window.gtag) return;
    if (!measurementId) {
      console.log(
        "Tracking not enabled, as `measurementId` was not given and there is no `GA_MEASUREMENT_ID`."
      );
      return;
    }
    window.gtag("config", measurementId, { page_path: location.pathname });
  }, [location]);

  const l = useMemo((): { lang: "en" | "ja"; disp: string } => {
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
                    sendEventGA("click_flag", {
                      name: value.name,
                      lang: l.lang,
                    });
                  }}
                ></input>
                <div>{value.name}</div>
                <a
                  data-uk-icon="icon:play; ratio: 1.5"
                  onClick={() => {
                    Speak(value.name, l.lang);
                    sendEventGA("play_speak", {
                      name: value.name,
                      lang: l.lang,
                    });
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

function initializeGA(measurementId: string) {
  // load gtag.js:  https://developers.google.com/analytics/devguides/collection/gtagjs
  let script1 = document.createElement("script");
  script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script1.async = true;
  document.body.appendChild(script1);

  let script2 = document.createElement("script");
  // プレーンテキスト、グローバルな window.gtag 関数を定義するため
  script2.text = `window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', '${measurementId}');`;
  document.body.appendChild(script2);
}

type EventLabel = "click_flag" | "play_speak";

function sendEventGA(label: EventLabel, value?: {}) {
  window.gtag("event", "click", {
    event_label: label,
    event_value: JSON.stringify(value),
  });
}
