import React from "react";
import {
  Modal,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { StoreContext } from "../../store/StoreContext";
import { observer } from "mobx-react";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: "100vw",
    height: "100vh",
    // top: "25%",
    // left: "35%",
    backgroundColor: "#fff",
    textAlign: "center",
  },
  closeWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  closeButton: {
    width: 30,
    height: 30,
    padding: "10px 10px 0 0",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const TripList = observer(() => {
  const classes = useStyles();
  const {
    trips,
    modalStore: { showTripsModal, setShowTripsModal },
  } = React.useContext(StoreContext);

  const handleClose = () => {
    setShowTripsModal(false);
  };

  return (
    <div>
      <Modal open={showTripsModal} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.closeWrapper}>
            <div className={classes.closeButton} onClick={handleClose}>
              <Close />
            </div>
          </div>
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
      </Modal>
    </div>
  );
});
