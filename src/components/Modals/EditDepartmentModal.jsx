import React from "react";
import { makeStyles, Modal } from "@material-ui/core";
import { Close, Edit } from "@material-ui/icons";

import { DepartmentForm } from "../Forms/DepartmentForm";
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
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 30px 30px",
  },
}));

export const EditDepartmentModal = ({departmentID, onClose}) => {
  const classes = useStyles();

  const {
    departments,
    updateDepartment,
  } = React.useContext(StoreContext);

  const onSubmit = async (event) => {
    event.preventDefault();
    const name = event.target.elements.department_name.value;
    event.target.reset();
    updateDepartment(departmentID, name);
    //await axios.put(`${process.env.REACT_APP_DEPARTMENTS}/${departmentID}`, {id: departmentID, name})
    onClose();
  };  

  return (
    <div>
      <Modal open={departmentID !== null} onClose={onClose}>
        <div className={classes.modal}>
          <div className={classes.closeWrapper}>
            <div className={classes.closeButton} onClick={onClose}>
              <Close />
            </div>
          </div>
          <div>
            <DepartmentForm
              onSubmit={onSubmit}
              depName={
                departments.find((dep) => dep.id === departmentID)
                  ?.name ?? ""
              }
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
