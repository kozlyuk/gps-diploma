import React from "react";
import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";

import { Wrapper } from "../Wrapper";
import { SideMenu } from "../SideMenu";
import { Modals } from "../Modals";
import { StoreContext } from "../../store/StoreContext";

export const Main = observer(() => {
  const { loading } = React.useContext(StoreContext);

  if (loading) return <CircularProgress />;

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
});
