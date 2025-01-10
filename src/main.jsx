import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import App from "./App.jsx";
// import { persistor, store } from "./redux/store.js";
import { store } from "./redux/store.js";
import "modern-normalize";
import "./index.css";
import "./fonts.css";
// import DeleteWaterModal from "./components/DeleteWaterModal/DeleteWaterModal.jsx";
// import LogOutModal from "./components/LogOutModal/LogOutModal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <BrowserRouter>
        <HelmetProvider>
          <App />
          {/* <DeleteWaterModal /> */}
            {/* <LogOutModal/> */}
        </HelmetProvider>
      </BrowserRouter>
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>
);
