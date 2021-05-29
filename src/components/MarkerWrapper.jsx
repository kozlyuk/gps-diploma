import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Button } from "@material-ui/core";
import { StoreContext } from "../store/StoreContext";

export const MarkerWrapper = ({ car }) => {
  const popup = React.useRef();
  const position = [car.record.position.lat, car.record.position.lng];

  const {
    modalStore: { setCarInfo },
  } = React.useContext(StoreContext);

  const modalClick = () => {
    setCarInfo(car);
    //  hide popup after open modal window
    popup.current._closeButton.click();
  };

  return (
    <Marker position={position} opacity={1}>
      <Tooltip>{`[${car.department}]:${car.id}`}</Tooltip>
      <Popup ref={popup}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={modalClick}>Show more</Button>
        </div>
      </Popup>
    </Marker>
  );
};
