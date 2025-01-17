// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TourProvider } from "@reactour/tour";
import steps from "../src/tour/steps.js";

import App from "./App.jsx";
import { persistor, store } from "./redux/store.js";

import "modern-normalize";
import "./index.css";
import "./fonts.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <HelmetProvider>
          <TourProvider steps={steps}>
            <App />
          </TourProvider>
        </HelmetProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </StrictMode>
);
