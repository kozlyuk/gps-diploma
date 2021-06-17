import React from "react";
import { ListItem, ListItemText, Collapse, Paper } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import axios from "axios";

import { StoreContext } from "../../store/StoreContext";
import { IntervalsPickerForm } from "../Forms/IntervalsPickerForm";

export const IntervalsForm = () => {
  const [open, setOpen] = React.useState(false);

  const {
    addToSearchHistory,
    showCars,
    userStore: { userId, token },
  } = React.useContext(StoreContext);

  const handleClick = () => {
    setOpen(!open);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const {
      start_time: { value: startTime },
      end_time: { value: endTime },
    } = event.target.elements;
    let idsQuery = showCars.reduce(
      (acc, curr, i) => `${acc}&car_id=${curr.id}`,
      ""
    );
    idsQuery = idsQuery.slice(1);
    const query = `${idsQuery}&start_time=${startTime}&end_time=${endTime}`;
    const cache = localStorage.getItem(query);
    if (cache == null) {
      const url = `${process.env.REACT_APP_CARS_TRACKING}tracking/records/?${query}`;
      // const response = await axios
      //   .get(url, { headers: { Authorization: `Token ${token}` } })
      //   .then((resp) => console.log(resp))
      //   .catch((e) => console.log(e));
      //  test response
      const pos = { lat: 51.55467836329367, lng: 10.54124053113658494 };

      const results = showCars.map((car) => {
        const recs = [];
        for (let i = 0; i < 1000; i++) {
          recs.push({
            lat: pos.lat + Math.random(),
            lng: pos.lng + Math.random(),
          });
        }
        return {
          id: car.id,
          records: recs,
          //[
          //   {
          //     lat: pos.lat + (Math.random() % 10),
          //     lng: pos.lng + (Math.random() % 1),
          //   },
          //   {
          //     lat: pos.lat + (Math.random() % 2),
          //     lng: pos.lng + (Math.random() % 5),
          //   },
          //   {
          //     lat: pos.lat + (Math.random() % 5),
          //     lng: pos.lng + (Math.random() % 3),
          //   },
          //   {
          //     lat: pos.lat + (Math.random() % 3),
          //     lng: pos.lng + (Math.random() % 8),
          //   },
          //   {
          //     lat: pos.lat + (Math.random() % 1),
          //     lng: pos.lng + (Math.random() % 7),
          //   },
          // ],
        };
      });
      const data = {
        id: Date.now(),
        ids: showCars.map((car) => car.uuid),
        records: results,
        startTime,
        endTime,
        userId,
      };
      addToSearchHistory(data);
      localStorage.setItem(query, results);
      return;
    }

    // const currentShowCarsIds = showCars.map((car) => car.uuid);

    // if (cache.ids === currentShowCarsIds) return;

    // const idsNotIncluded = currentShowCarsIds.map(
    //   (car) => !cache.ids.includes(car.uuid)
    // );
  };

  return (
    <Paper style={{ marginTop: 5 }}>
      <ListItem
        button
        onClick={handleClick}
        style={{ paddingTop: 0, paddingBottom: 0 }}
      >
        <ListItemText
          primary={"Intervals"}
          primaryTypographyProps={{ style: { fontSize: 16 } }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <IntervalsPickerForm onSubmit={onSubmit} />
      </Collapse>
    </Paper>
  );
};
