import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { ModalComponent } from "./ModalComponent";

export const MarkerWrapper = ({ car }) => {
  const [open, setOpen] = React.useState(false);
  const popup = React.useRef();
  const position = [car.record.position.lat, car.record.position.lng];

  const modalClick = () => {
    setOpen(true);
    //  hide popup after open modal window
    popup.current._closeButton.click();
  }
  return (
    <Marker position={position} opacity={1}>
      <Tooltip>{`[${car.department}]:${car.id}`}</Tooltip>
      <Popup ref={popup}>
        <button onClick={modalClick}>Show more</button>
      </Popup>
      <ModalComponent open={open} handleClose={() => setOpen(false)} carInfo={car}/>
    </Marker>
  );
};
