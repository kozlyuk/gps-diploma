import React from "react";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles({});

export const TripsList = () => {
  const classes = useStyles();
  const { trips } = React.useContext(StoreContext);

  return (
    <div>
      <div>
        <List>
          {trips.map((trip) => (
            <ListItem button key={trip.id.toString()}>
              <ListItemText primary={trip.name} />
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
};
