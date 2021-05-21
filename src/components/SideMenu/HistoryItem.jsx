import React from "react";
import { ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

import { StoreContext } from "../../store/StoreContext";
const useStyles = makeStyles((theme) => ({
  item: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
  },
}));

export const HistoryItem = ({ item }) => {
  const classes = useStyles();
  const { addToShowHistory, removeFromShowHistory, showHistory } =
    React.useContext(StoreContext);
  const [show, setShow] = React.useState(showHistory.includes(item));

  const onClick = () => {
    if (show) removeFromShowHistory(item.id);
    else addToShowHistory(item.id);
    setShow((prev) => !prev);
  };

  return (
    <div className={classes.item}>
      <ListItem button onClick={onClick}>
        <ListItemText
         classes={{ primary: classes.text }}
          primary={`${item.startTime} - ${item.endTime}`}
        />
        <div>
          {show ? (
            <Visibility fontSize="small" htmlColor="green" />
          ) : (
            <VisibilityOff fontSize="small" htmlColor="blue" />
          )}
        </div>
      </ListItem>
    </div>
  );
};
