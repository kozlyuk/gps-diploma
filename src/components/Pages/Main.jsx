import React from "react";

import { Wrapper } from "../Wrapper";
import { SideMenu } from "../SideMenu";
import { Modals } from "../Modals";

export const Main = () => {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <SideMenu />
      <Wrapper />
      <Modals />
    </div>
  );
};
