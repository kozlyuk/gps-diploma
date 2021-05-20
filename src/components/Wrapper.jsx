import React from "react";
import { useMapEvent, MapContainer, TileLayer, ZoomControl } from "react-leaflet";
import { observer } from "mobx-react";

import { StoreContext } from "../store/StoreContext";
import { MarkerWrapper } from "./MarkerWrapper";
import { Trip } from "./Trip";

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
  const { cars, updateCars, showTrips, showCars } = React.useContext(StoreContext);

  React.useEffect(() => {
    const update = setInterval(() => {
      let newData = [...cars];
      newData.forEach((e) => (e.record.position.lat += 0.001));
      updateCars(newData);
    }, 5000);
    return () => clearInterval(update);
  }, [cars, updateCars]);

  return (
    <>
      <MapContainer center={pos} minZoom={8} zoom={10} zoomControl={false}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <ZoomControl position="topright"/>
        <SetUpAnimatedPane />

        {showCars.map((car) => (
          <MarkerWrapper key={car.id} car={car} />
        ))}

        {showTrips.map((trip) => (
          <Trip key={trip.id} trip={trip} />
        ))}
      </MapContainer>
    </>
  );
});
