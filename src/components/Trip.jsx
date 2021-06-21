import React from "react";
import { Polyline, CircleMarker, Popup } from "react-leaflet";
import { StoreContext } from "../store/StoreContext";

export const Trip = ({ trip }) => {
  const { precision } = React.useContext(StoreContext);

  if (!trip) return null;
  const positions = trip.records.map((record) => [
    record.latitude / precision,
    record.longitude / precision,
  ]);

  return (
    <>
      {trip.records
        .filter((record, i) => i % 5 == 0)
        .map((record) => (
          <CircleMarker
            key={record.id.toString()}
            center={[record.latitude / precision, record.longitude / precision]}
            radius={15}
          >
            <Popup>
              Speed: {record.speed} <br />
              Satellites: {record.satellites}
            </Popup>
          </CircleMarker>
        ))}
      <Polyline positions={positions} pathOptions={{ color: "yellow" }} />
    </>
  );
};
