import React from "react";
import { makeStyles } from "@material-ui/core";
import { Close, CheckCircleOutline, CancelOutlined } from "@material-ui/icons";
import { Modal } from "@material-ui/core";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    width: 400,
    top: "25%",
    left: "35%",
    backgroundColor: "#fff",
    border: "2px solid #000",
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

export const ModalComponent = ({ open, handleClose, carInfo }) => {
  const classes = useStyles();
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
            <h2>"CAR INFO"</h2>
            <h2>Brand: {carInfo.brand}</h2>
            <h2>Model: {carInfo.model}</h2>
            <h2>Department: {carInfo.department}</h2>
            <h2>Fuel: {carInfo.record.fuel}</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div>
                <p style={{ fontSize: 18 }}>Is locked: </p>
              </div>
              <div style={{ paddingLeft: 10 }}>
                {carInfo.record.isLocked ? (
                  <CheckCircleOutline htmlColor="green" />
                ) : (
                  <CancelOutlined htmlColor="red" />
                )}
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};
