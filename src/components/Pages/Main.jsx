import React from "react";
import { CircularProgress } from "@material-ui/core";
import { observer } from "mobx-react";
import axios from 'axios'

import { Wrapper } from "../Wrapper";
import { SideMenu } from "../SideMenu";
import { Modals } from "../Modals";
import { StoreContext } from "../../store/StoreContext";

export const Main = observer(() => {
  const {
    loading,
    showCars,
    updateCars,
    userStore: { token },
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (showCars.length === 0) return;
    const loadData = async () => {
      const queryUrl = `${process.env.REACT_APP_CARS}`;
      await axios
        .get(queryUrl, { headers: { Authorization: `Token ${token}` } })
        .then(({ data }) => {
          //  update cars here
          updateCars(data);
        });
    };
    loadData();
  }, []);

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </div>
    );

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
