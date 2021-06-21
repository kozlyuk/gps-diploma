import React from "react";
import { makeStyles, Breadcrumbs, Typography } from "@material-ui/core";
import { NavigateNext } from "@material-ui/icons";
import { MapContainer, TileLayer } from "react-leaflet";
import { Link, useParams } from "react-router-dom";
import { StoreContext } from "../../store/StoreContext";
import { Trip } from "../Trip";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 30,
  },
  wrapper: {
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
  map: {
    width: "500px !important",
    height: "400px !important",
  },
  info: {
    marginTop: 30,
  },
});

export const TripInfo = () => {
  const classes = useStyles();
  const { trips, precision } = React.useContext(StoreContext);
  const { uuid } = useParams();
  const trip = trips.find((t) => t.id == uuid);
  const positions = trip?.records?.map((rec) => [
    rec.latitude / precision,
    rec.longitude / precision,
  ]);

  const maxSpeed = trip.records.reduce(
    (acc, curr) => (acc > curr.speed ? acc : curr.speed),
    0
  );
  const averageSpeed =
    trip.records.reduce((acc, curr) => acc + curr.speed, 0) /
    trip.records.length;

  return (
    <div className={classes.container}>
      <Breadcrumbs separator={<NavigateNext fontSize="small" />}>
        <Link color="inherit" to="/" className={classes.link}>
          Map
        </Link>
        <Link color="inherit" to="/trips" className={classes.link}>
          Trip List
        </Link>
        <Typography color="textPrimary">{trip.name}</Typography>
      </Breadcrumbs>
      <div className={classes.wrapper}>
        <MapContainer
          className={classes.map}
          center={positions[0]}
          minZoom={5}
          zoom={16}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <Trip trip={trip} />
        </MapContainer>
        <div className={classes.info}>
          <Typography align="center">{trip.name}</Typography>
          <Typography align="center">Driver: {trip.driver}</Typography>
          <Typography align="center">
            Start: {new Date(trip.start_date).toLocaleString()} - End:{" "}
            {new Date(trip.end_date).toLocaleString()}
          </Typography>
          <Typography>Max speed: {maxSpeed}</Typography>
          <Typography>Average speed: {averageSpeed.toFixed(1)} km/h</Typography>
          <Typography>Errors: 0</Typography>
        </div>
      </div>
    </div>
  );
};
