import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { SideMenu } from "./components/SideMenu";
import { Wrapper } from "./components/Wrapper";
import store from "./store/AppStore";
import { StoreContext } from "./store/StoreContext";
import { Auth } from "./components/Pages/Auth";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Auth />
          </Route>
          <AuthenticatedRoute path="/app">
            <div
              style={{
                display: "flex",
              }}
            >
              <SideMenu />
              <Wrapper />
            </div>
          </AuthenticatedRoute>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
