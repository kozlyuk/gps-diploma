import React from "react";
import "./App.css";
import { SideMenu } from "./components/SideMenu/SideMenu";
import { Wrapper } from "./components/Wrapper";
import store from "./store/AppStore";
import { StoreContext } from "./store/StoreContext";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <div style={{display: "flex"}}>
        <SideMenu />
        <Wrapper />
      </div>
    </StoreContext.Provider>
  );
};

export default App;
