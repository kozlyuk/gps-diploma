import React from "react";
import { makeStyles, Modal } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import axios from "axios";

import { StoreContext } from "../../store/StoreContext";
import { CarForm } from "../Forms/CarForm";

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

  const { addCar } = React.useContext(StoreContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    const {
      car_model: { value: model },
      department: { value: department },
      car_id: { value: id },
    } = event.target.elements;
    const car = {
      id,
      model,
      department,
      // brand: "some brand",
      // record: {
      //   fuel: Math.random() % 25,
      //   isLocked: !!Math.random(0, 1),
      //   position: { lat: Math.random() % 33, lng: Math.random() % 66 },
      // },
    };
    //addCar(car);

    //await axios.post(`${process.env.REACT_APP_CARS}/`, car);

    event.target.reset();
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
          <div>
            <CarForm onSubmit={onSubmit} classes={classes} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
