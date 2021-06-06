import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  makeStyles,
  Breadcrumbs,
  Typography,
} from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import {
  Switch,
  Route,
  useRouteMatch,
  useHistory,
  Link,
} from "react-router-dom";

import { TripInfo } from "./TripInfo";
import { StoreContext } from "../../store/StoreContext";
import { CardTrip } from "../CardTrip";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  list: {
    marginTop: 20,
  },
  link: {
    textDecoration: "none",
    color: "#aaa",
    transition: "0.2s",
    "&:hover": {
      color: "#000",
    },
  },
});

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
        <div className={classes.container}>
          <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
            <Link color="inherit" to="/" className={classes.link}>
              Map
            </Link>
            <Typography color="textPrimary">Trips list</Typography>
          </Breadcrumbs>
          <div className={classes.list}>
            <List>
              {trips.map((trip) => (
                <CardTrip
                  key={trip.id.toString()}
                  trip={trip}
                  onClick={() => onTripPress(trip.id)}
                />
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
