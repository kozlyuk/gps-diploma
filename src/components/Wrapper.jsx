import React from "react";
import {
  useMapEvent,
  MapContainer,
  TileLayer,
  ZoomControl,
} from "react-leaflet";
import { observer } from "mobx-react";
import axios from "axios";

import { StoreContext } from "../store/StoreContext";
import { MarkerWrapper } from "./MarkerWrapper";
import { Trip } from "./Trip";
import { HistoryRender } from "./HistoryRender";

const SetUpAnimatedPane = () => {
  const map = useMapEvent("click", (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: true,
    });
  });
  return <></>;
};

export const Wrapper = observer(() => {
  const pos = [51.505, -0.09];
  const {
    cars,
    updateCars,
    showTrips,
    showCars,
    userStore: { token },
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    if (showCars.length === 0) return;
    const update = setInterval(async () => {
      const queryUrl = `${process.env.REACT_APP_CARS}`;
      await axios
        .get(queryUrl, { headers: { Authorization: `Token ${token}` } })
        .then(({ data }) => {
          //  update cars here
          //updateCars(data);
          console.log(data);
        });
    }, 5000);
    return () => clearInterval(update);
  }, [cars, updateCars, showCars, token]);

  return (
    <>
      <MapContainer center={pos} minZoom={2} zoom={10} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="topright" />
        <SetUpAnimatedPane />
        {showCars?.map((car) => (
          <MarkerWrapper key={car.id} car={car} />
        ))}
        {showTrips?.map((trip) => (
          <Trip key={trip.id} trip={trip} />
        ))}
        <HistoryRender />
      </MapContainer>
    </>
  );
});
