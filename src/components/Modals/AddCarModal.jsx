import React from "react";
import { makeStyles, Modal, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";

import { CarForm } from "../Forms/CarForm";
import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    top: "15%",
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
    marginBottom: 5,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 30px 30px",
  },
}));

export const AddCarModal = ({ show, onClose }) => {
  const classes = useStyles();

  const {
    addCar,
    userStore: { token },
  } = React.useContext(StoreContext);

  const onSubmit = async (values) => {
    const {
      trackerIMEI,
      department,
      carNumber,
      model,
      trackerSimNumber,
      color,
    } = values;
    const car = {
      model,
      department,
      sim_imei: trackerIMEI,
      sim_number: trackerSimNumber,
      number: carNumber,
      color,
      is_active: false,
    };
    
    await axios
      .post(`${process.env.REACT_APP_CARS}`, car, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${token}`,
        },
      })
      .then(({ data }) => {
        console.log("on adding car response: ", data);
        addCar(data);
      })
      .catch((e) => console.log("Error adding new car: ", e));

    onClose();
  };

  return (
    <div>
      <Modal open={show} onClose={onClose}>
        <div className={classes.modal}>
          <div className={classes.closeWrapper}>
            <div className={classes.closeButton} onClick={onClose}>
              <Close />
            </div>
          </div>
          <Typography variant="h6">Add Car Modal</Typography>
          <div>
            <CarForm onSubmit={onSubmit} classes={classes} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
