import React from "react";
import "./App.css";
import { Wrapper } from "./components/Wrapper";
import store from "./store/AppStore";
import { StoreContext } from "./store/StoreContext";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Wrapper />
    </StoreContext.Provider>
  );
};

export default App;
