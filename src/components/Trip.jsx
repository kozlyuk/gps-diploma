import React from "react";
import { Polyline, CircleMarker, Popup } from "react-leaflet";

export const Trip = ({ trip }) => {
  if (!trip) return null;
  const positions = trip.records.map((record) => [
    record.position.lat,
    record.position.lng,
  ]);

  return (
    <>
      {trip.records.map((record) => (
        <CircleMarker
          key={record.id.toString()}
          center={record.position}
          radius={15}
        >
          <Popup>
            Fuel: {record.fuel} <br/>
            Is locked: {record.isLocked ? "Yes" : "No"}
          </Popup>
        </CircleMarker>
      ))}
      <Polyline positions={positions} pathOptions={{color: 'yellow'}}/>
    </>
  );
};
