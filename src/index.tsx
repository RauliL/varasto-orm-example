import "reflect-metadata";

import { createWebStorage } from "@varasto/web-storage";
import React from "react";
import ReactDOM from "react-dom/client";

import { App } from "./components";

const storage = createWebStorage(window.localStorage);
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <App storage={storage} />
  </React.StrictMode>
);
