import React from "react";
import { Polyline, CircleMarker } from "react-leaflet";

export const Trip = ({ trip }) => {
  if (!trip) return null;
  const positions = trip.records.map((record) => record.position);
  return (
    <>
      {trip.records.map((record) => (
        <CircleMarker
          key={record.id.toString()}
          position={record.position}
          radius={5}
        />
      ))}
      <Polyline positions={positions} />
    </>
  );
};
