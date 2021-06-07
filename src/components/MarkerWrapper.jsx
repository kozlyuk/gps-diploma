import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Button } from "@material-ui/core";
import * as Leaflet from "leaflet";

import { StoreContext } from "../store/StoreContext";

const imgSource =
  "https://cdn.dribbble.com/users/1787323/screenshots/14677197/media/d699460e529ff1c026dce3931078ebcb.png";

export const MarkerWrapper = ({ car }) => {
  const popup = React.useRef();
  const position = [car.record.position.lat, car.record.position.lng];

  const markerImageHtmlStyles = `
  width: 1.5rem;
  height: 1.5rem;
  transform: rotate(-45deg);
  border-radius: 3rem 3rem 0;`;

  const markerHtmlStyles = `
    background-color: ${car.color};
    width: 1.5rem;
    height: 1.5rem;
    display: block;
    left: -0.8rem;
    top: -0.3rem;
    position: relative;
    border-radius: 3rem 3rem 0;
    transform: rotate(45deg);
    border: 1px solid #FFFFFF`;

  const icon = Leaflet.divIcon({
    className: "",
    iconAnchor: [0, 24],
    tooltipAnchor: [11, -11],
    popupAnchor: [0, -11],
    html: `<span style="${markerHtmlStyles}"><img style="${markerImageHtmlStyles}" src="${imgSource}" alt="no image"/></span>`,
  });

  const {
    modalStore: { setCarInfo, setCommandShowing },
  } = React.useContext(StoreContext);

  const modalClick = () => {
    setCarInfo(car);
    //  hide popup after open modal window
    popup.current._closeButton.click();
  };

  const commandClick = () => {
    setCommandShowing(true);
    //  hide popup after open modal window
    popup.current._closeButton.click();
  };

  return (
    <Marker position={position} opacity={1} icon={icon}>
      <Tooltip>{`[${car.department}]:${car.id}`}</Tooltip>
      <Popup ref={popup}>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button onClick={modalClick}>Show more</Button>
          <Button onClick={commandClick}>Send Command</Button>
        </div>
      </Popup>
    </Marker>
  );
};
