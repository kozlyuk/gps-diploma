import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";

export const MarkerWrapper = ({ car }) => {
  const position = [car.record.position.lat, car.record.position.lng];
  return (
    <Marker position={position}>
      <Tooltip>{`${car.brand}\n${car.model}\n${car.department}`}</Tooltip>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        <button>111</button>
      </Popup>
    </Marker>
  );
};
