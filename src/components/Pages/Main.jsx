import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";
import { Wrapper } from "../Wrapper";
import { SideMenu } from "../SideMenu";
import { TripsList } from "./TripsList";

export const Main = () => {
  const { path, url } = useRouteMatch();

  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideMenu />
      <Wrapper />
    </div>
  );
};
