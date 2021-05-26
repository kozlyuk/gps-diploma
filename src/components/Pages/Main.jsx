import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Wrapper } from "../Wrapper";
import { SideMenu } from "../SideMenu";
import { TripsList } from "./TripsList";

export const Main = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route path={path} exact>
        <div
          style={{
            display: "flex",
          }}
        >
          <SideMenu />
          <Wrapper />
        </div>
      </Route>
      <Route path={`${path}/trips`}>
        <TripsList />
      </Route>
    </Switch>
  );
};
