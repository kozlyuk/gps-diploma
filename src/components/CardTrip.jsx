import React from "react";
import {
  Card,
  CardHeader,
  CardActions,
  CardContent,
  makeStyles,
  IconButton,
  Collapse,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, InfoOutlined } from "@material-ui/icons";
import { MapContainer, TileLayer, Polyline, CircleMarker } from "react-leaflet";

const useStyles = makeStyles({
  map: {
    width: "500px !important",
    height: "200px !important",
  },
  card: {
    marginBottom: 30,
    minWidth: 300,
    maxWidth: 700,
  },
});

export const CardTrip = ({ trip, onClick }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const positions = trip.records.map((rec) => rec.position);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };
  return (
    <Card className={classes.card}>
      <CardHeader
        title={trip.name}
        subheader={new Date(trip.date).toLocaleString()}
      />
      <CardActions disableSpacing>
        <IconButton onClick={onClick}>
          <InfoOutlined style={{ fontSize: 20 }} />
        </IconButton>
        <IconButton onClick={handleOpen}>
          {open ? (
            <ExpandLess style={{ fontSize: 20 }} />
          ) : (
            <ExpandMore style={{ fontSize: 20 }} />
          )}
        </IconButton>
      </CardActions>
      <Collapse in={open}>
        <CardContent>
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
            <Polyline positions={positions} />
            {positions.map((pos, i) => (
              <CircleMarker key={i.toString()} center={pos} radius={5} />
            ))}
          </MapContainer>
        </CardContent>
      </Collapse>
    </Card>
  );
};
