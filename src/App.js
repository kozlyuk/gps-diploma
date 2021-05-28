import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import store from "./store/AppStore";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { StoreContext } from "./store/StoreContext";
import { Auth } from "./components/Pages/Auth";
import { Main } from "./components/Pages/Main";
import { TripsList } from "./components/Pages/TripsList";

const App = () => {
  return (
    <StoreContext.Provider value={store}>
      <Router>
        <Switch>
          <Route path="/auth" exact>
            <Auth />
          </Route>
          <AuthenticatedRoute path="/">
            <Switch>
              <Route path="/" exact>
                <Main />
              </Route>
              <Route path="/trips">
                <TripsList />
              </Route>
            </Switch>
          </AuthenticatedRoute>
        </Switch>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
