import React from "react";
import {
  useMapEvent,
  MapContainer,
  TileLayer,
  ZoomControl,
  Polyline,
  CircleMarker,
} from "react-leaflet";
import { observer } from "mobx-react";

import { StoreContext } from "../store/StoreContext";
import { MarkerWrapper } from "./MarkerWrapper";
import { Trip } from "./Trip";
import { CarInfoModal } from "./Modals/CarInfoModal";
import { EditDepartmentModal } from "./Modals/EditDepartmentModal";
import { EditCarModal } from "./Modals/EditCarModal";

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
    showHistory,
    modalStore: { carInfo, setCarInfo },
  } = React.useContext(StoreContext);

  React.useEffect(() => {
    const update = setInterval(() => {
      const idsQuery = showCars.reduce(
        (acc, curr, i) => `${acc}${i !== 0 ? "&" : ""}id=${curr.id}`,
        ""
      );
      const queryUrl = `${process.env.REACT_APP_BACKEND_URL}/api/cars/?${idsQuery}`;
      console.log("get for updating car location: ", queryUrl);
      let newData = [...cars];
      newData.forEach((car) => {
        if (showCars.includes(car)) car.record.position.lat += 0.001;
      });
      updateCars(newData);
    }, 5000);
    return () => clearInterval(update);
  }, [cars, updateCars, showCars]);

  return (
    <>
      <MapContainer center={pos} minZoom={5} zoom={10} zoomControl={false}>
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
        {showHistory?.map((history) =>
          history.records.map((car) => {
            const randomColor =
              "#" + Math.floor(Math.random() * 16777215).toString(16);
            return (
              <>
                <Polyline
                  key={history.id}
                  positions={car.records}
                  pathOptions={{ color: randomColor }}
                />
                {car.records.map((rec, i) => (
                  <CircleMarker
                    key={i.toString()}
                    center={rec}
                    radius={15}
                    pathOptions={{ color: randomColor }}
                  />
                ))}
              </>
            );
          })
        )}
      </MapContainer>

      <CarInfoModal
        open={carInfo !== null}
        handleClose={() => setCarInfo(null)}
        carInfo={carInfo}
      />

      <EditDepartmentModal />
      <EditCarModal />
    </>
  );
});
