import React from "react";
import { Modal, makeStyles, TextField, Button } from "@material-ui/core";
import { Close, Explore } from "@material-ui/icons";
import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    top: "25%",
    left: "35%",
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
    "&:hover": {
      cursor: "pointer",
      color: "#aaa",
    },
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginBottom: 20,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },
  submitButton: {
    marginTop: 25,
  },
}));

export const ModalIntervalPicker = ({ open, handleClose }) => {
  const classes = useStyles();

  const {
    addToSearchHistory,
    showCars,
    userStore: { userId },
    modalStore: { setShowIntervalResultsModal },
  } = React.useContext(StoreContext);

  const onSubmit = (event) => {
    event.preventDefault();
    const startTime = event.target.elements.start_time.value;
    const endTime = event.target.elements.end_time.value;
    const idsQuery = showCars.reduce(
      (acc, curr, i) => `${acc}${i !== 0 ? "&" : ""}id=${curr.id}`,
      ""
    );
    const url = `${process.env.REACT_APP_BACKEND_URL}/api/cars/tracking/?${idsQuery}&start_time=${startTime}&end_time=${endTime}`;
    console.log("post for interval: ", url);
    handleClose();
    const data = {
      id: Date.now(),
      ids: showCars.map((car) => car.id),
      records: [],
      startTime,
      endTime,
      userId,
    };
    console.log("search data: ", data);
    addToSearchHistory(data);
    const pos = { lat: 51.55467836329367, lng: -0.54124053113658494 };
    const results = [
      showCars.map((car) => ({
        id: car.id,
        records: [
          {
            lat: pos.lat + (Math.random() % 10),
            lng: pos.lng + (Math.random() % 1),
          },
          {
            lat: pos.lat + (Math.random() % 2),
            lng: pos.lng + (Math.random() % 5),
          },
          {
            lat: pos.lat + (Math.random() % 5),
            lng: pos.lng + (Math.random() % 3),
          },
          {
            lat: pos.lat + (Math.random() % 3),
            lng: pos.lng + (Math.random() % 8),
          },
          {
            lat: pos.lat + (Math.random() % 1),
            lng: pos.lng + (Math.random() % 7),
          },
        ],
      })),
    ];
    setShowIntervalResultsModal(true, results);
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.closeWrapper}>
            <div className={classes.closeButton} onClick={handleClose}>
              <Close />
            </div>
          </div>
          <div>
            <form className={classes.container} onSubmit={onSubmit}>
              <div>
                <TextField
                  label="Start date time"
                  type="datetime-local"
                  name="start_time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="End date time"
                  type="datetime-local"
                  name="end_time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              <div>
                <Button
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  color="secondary"
                  endIcon={<Explore />}
                >
                  Show
                </Button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};
