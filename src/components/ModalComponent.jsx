import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: 400,
    top: "30%",
    left: "35%",
    backgroundColor: "#ababab",
    border: "2px solid #000",
    textAlign: "center"
  },
});

export const ModalComponent = ({ open, handleClose, carInfo }) => {
  const classes = useStyles();
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <h2>Brand: {carInfo.brand}</h2>
          <h2>Model: {carInfo.model}</h2>
          <h2>Department: {carInfo.department}</h2>
          <h2>Fuel: {carInfo.record.fuel}</h2>
          <h2>Is locked: {carInfo.record.isLocked ? "yes" : "no"}</h2>
        </div>
      </Modal>
    </div>
  );
};
