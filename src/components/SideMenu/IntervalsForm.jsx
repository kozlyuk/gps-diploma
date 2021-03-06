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
      const url = `${process.env.REACT_APP_CARS_TRACKING}?${query}`;
      const response = await axios
        .get(url, { headers: { Authorization: `Token ${token}` } })
        .then((resp) => {
          console.log(resp);
          const results = resp.data;
          const data = {
            id: Date.now(),
            ids: showCars.map((car) => car.id),
            records: results,
            startTime,
            endTime,
            userId,
          };
          addToSearchHistory(data);
          localStorage.setItem(query, results);
          return;
        })
        .catch((e) => console.log(e));
    }
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
