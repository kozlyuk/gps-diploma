import React from "react";
import { Polyline, CircleMarker } from "react-leaflet";
import { observer } from "mobx-react";

import { StoreContext } from "../store/StoreContext";

export const HistoryRender = observer(() => {
  const { showHistory } = React.useContext(StoreContext);
  return (
    <>
      {showHistory?.map((history) =>
        history.records.map((car) => {
          const randomColor =
            "#" + Math.floor(Math.random() * 16777215).toString(16);
          return (
            <>
              <Polyline
                key={history.id}
                positions={car.records}
                pathOptions={{ color: randomColor }}
              />
              {car.records.map((rec, i) => (
                <CircleMarker
                  key={i.toString()}
                  center={rec}
                  radius={3}
                  pathOptions={{ color: randomColor }}
                />
              ))}
            </>
          );
        })
      )}
    </>
  );
});
