import React from "react";
import { makeStyles, Modal, Typography } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";
import axios from "axios";

import { StoreContext } from "../../store/StoreContext";
import { CarForm } from "../Forms/CarForm";

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

export const EditCarModal = ({ onClose, carID }) => {
  const classes = useStyles();

  const { cars, updateCar } = React.useContext(StoreContext);

  const car = cars.find((car) => car.uuid === carID) ?? null;

  const onSubmit = async (event) => {
    event.preventDefault();
    const {
      car_id: { value: id },
      car_model: { value: model },
      department: { value: department },
    } = event.target.elements;
    const updatedCar = {
      ...car,
      id,
      department,
      model,
    };
    updateCar(updatedCar);
    event.target.reset();
    onClose();
    //await axios.put(`${process.env.REACT_APP_CARS}/${car.uuid}`)
  };

  return (
    <div>
      <Modal open={carID !== null} onClose={onClose}>
        <div className={classes.modal}>
          <div className={classes.closeWrapper}>
            <div className={classes.closeButton} onClick={onClose}>
              <Close />
            </div>
          </div>
          <Typography variant="h6">Edit Car Modal</Typography>
          <div>
            <CarForm
              onSubmit={onSubmit}
              car={car}
              classes={classes}
              buttonTitle="Edit"
              endIcon={<Edit />}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
