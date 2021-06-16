import React from "react";

import "./App.css";
import { Routes } from "./Routes";
import { StoreContext } from "./store/StoreContext";
import store from "./store/AppStore";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Routes />
    </StoreContext.Provider>
  );
};

export default App;
