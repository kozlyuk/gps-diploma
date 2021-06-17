import React from "react";
import { makeStyles, Modal, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { observer } from "mobx-react";

import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles({
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
  container: {
    minHeight: 250,
    padding: "0px 10px 10px",
  },
});

export const CarInfoModal = observer(({ open, handleClose, carInfo }) => {
  const classes = useStyles();
  const { models, departments, cars } = React.useContext(StoreContext);
  if (carInfo === null) return null;

  const currCar = cars.find((car) => car.id == carInfo.id);

  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.closeWrapper}>
            <div className={classes.closeButton} onClick={handleClose}>
              <Close />
            </div>
          </div>
          <div className={classes.container}>
            <Typography variant="h4" style={{marginBottom: 25}}>CAR INFO</Typography>
            <Typography variant="h6">
              Model: {models.find((m) => m.id == currCar.model).name}
            </Typography>
            <Typography variant="h6">
              Department:{" "}
              {departments.find((dep) => dep.id == currCar.department).name}
            </Typography>
            {currCar.hasOwnProperty("last_position") && (
              <Typography variant="h6">Speed: {currCar.last_position.speed} km/h</Typography>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
});
