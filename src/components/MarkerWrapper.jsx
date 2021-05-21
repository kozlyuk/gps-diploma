import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Button } from "@material-ui/core";
import { ModalComponent } from "./ModalComponent";
import { ModalIntervalPicker } from "./ModalIntervalPicker";

export const MarkerWrapper = ({ car }) => {
  const [open, setOpen] = React.useState(false);
  const [openPicker, setOpenPicker] = React.useState(false);
  const popup = React.useRef();
  const position = [car.record.position.lat, car.record.position.lng];

  const modalClick = () => {
    setOpen(true);
    //  hide popup after open modal window
    popup.current._closeButton.click();
  };
  const showIntervalModal = () => {
    setOpenPicker(true);
    popup.current._closeButton.click();
  };

  return (
    <Marker position={position} opacity={1}>
      <Tooltip>{`[${car.department}]:${car.id}`}</Tooltip>
      <Popup ref={popup}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={modalClick}>Show more</Button>
          <Button onClick={showIntervalModal}>Show interval</Button>
        </div>
      </Popup>
      <ModalComponent
        open={open}
        handleClose={() => setOpen(false)}
        carInfo={car}
      />
      <ModalIntervalPicker
        open={openPicker}
        handleClose={() => setOpenPicker(false)}
      />
    </Marker>
  );
};
