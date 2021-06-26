import React from "react";
import { Polyline, CircleMarker } from "react-leaflet";
import { observer } from "mobx-react";

import { StoreContext } from "../store/StoreContext";

export const HistoryRender = observer(() => {
  const { showHistory, precision } = React.useContext(StoreContext);
  return (
    <>
      {showHistory?.map((history) => {
        const randomColor =
          "#" + Math.floor(Math.random() * 16777215).toString(16);
        const allRecords = history.records.map((rec) => [
          rec.latitude / precision,
          rec.longitude / precision,
        ]);
        return (
          <>
            <Polyline
              key={history.id}
              positions={allRecords}
              pathOptions={{ color: randomColor }}
            />
            {/* {history.records.map((rec) => (
              <CircleMarker
                key={rec.id.toString()}
                center={[rec.latitude / precision, rec.longitude / precision]}
                radius={3}
                pathOptions={{ color: randomColor }}
              />
            ))} */}
          </>
        );
      })}
    </>
  );
});
