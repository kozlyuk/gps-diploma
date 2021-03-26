import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import "./App.css";

function App() {
  const pos = [51.505, -0.09];
  const [position, setPosition] = React.useState(pos);
  React.useEffect(() => {
     const update = setInterval(() => {
      const newPos = [...position];
      newPos[0] += 0.001;
      setPosition(newPos);
    }, 1000);
    return () => clearInterval(update);
  }, [position]);

  
  // function LocationMarker() {
  //   const [position, setPosition] = React.useState(null)
  //   const map = useMapEvents({
  //     click() {
  //       map.locate()
  //     },
  //     locationfound(e) {
  //       setPosition(e.latlng)
  //       map.flyTo(e.latlng, map.getZoom())
  //     },
  //   })
  
  //   return position === null ? null : (
  //     <Marker position={position}>
  //       <Popup>You are here</Popup>
  //     </Marker>
  //   )
  // }
  return (
    <MapContainer center={position} minZoom={8} zoom={10}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
      </Marker>
      {/* <LocationMarker /> */}
    </MapContainer>
  )
}

export default App;
