import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { ModalComponent } from "./ModalComponent";

export const MarkerWrapper = ({ car }) => {
  const [open, setOpen] = React.useState(false);
  const position = [car.record.position.lat, car.record.position.lng];
  return (
    <Marker position={position} opacity={1}>
      <Tooltip>{`${car.brand}\n${car.model}\n${car.department}`}</Tooltip>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
        <button onClick={() => setOpen(true)}>111</button>
      </Popup>
      <ModalComponent open={open} handleClose={() => setOpen(false)} carInfo={car}/>
    </Marker>
  );
};
