import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store/AppStore";
import { StoreContext } from "./store/StoreContext";
import { Auth } from "./components/Pages/Auth";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { Main } from "./components/Pages/Main";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <AuthenticatedRoute path="/">
            <Main />
          </AuthenticatedRoute>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
