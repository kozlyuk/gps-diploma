import React from "react";
import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Link,
} from "react-router-dom";

import { TripInfo } from "./TripInfo";
import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles({});

export const TripsList = () => {
  const classes = useStyles();
  const { trips } = React.useContext(StoreContext);

  const { path, url } = useRouteMatch();
  const history = useHistory();

  const onTripPress = (tripID) => {
    history.push(`${url}/${tripID}`);
  };

  return (
    <Switch>
      <Route path={path} exact>
        <div>
          <Link to="/">Back</Link>
          <div>
            <List>
              {trips.map((trip) => (
                <ListItem
                  button
                  onClick={() => onTripPress(trip.id)}
                  key={trip.id.toString()}
                >
                  <ListItemText primary={trip.name} />
                </ListItem>
              ))}
            </List>
          </div>
        </div>
      </Route>
      <Route path={`${path}/:uuid`}>
        <TripInfo />
      </Route>
    </Switch>
  );
};
