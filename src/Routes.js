import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import { Auth } from "./components/Pages/Auth";
import { Main } from "./components/Pages/Main";
import { TripsList } from "./components/Pages/TripsList";
import { TripInfo } from "./components/Pages/TripInfo";

export const Routes = () => {
  return (
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
              <Route path="/trips/" exact>
                <TripsList />
              </Route>
              <Switch>
                <Route path="/trips/:uuid">
                  <TripInfo />
                </Route>
              </Switch>
            </Route>
          </Switch>
        </AuthenticatedRoute>
      </Switch>
    </Router>
  );
};
