import React from "react";
import { makeStyles, Modal, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";

import { CommandForm } from "../Forms/CommandForm";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 600,
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
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px 30px 30px",
  },
  argsWrapper: {
    maxHeight: 100,
    height: "auto",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: 5,
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#555",
    },
  },
}));

export const CommandModal = ({ show, onClose }) => {
  const classes = useStyles();

  const onSubmit = (event) => {
    event.preventDefault();
    const elems = event.target.elements;
    if (elems.command.value === "None") {
      console.log("Error command is not selected!");
      return;
    }
    console.log(elems);
    //  print param name and value
    for (let i = 3; i < elems.length - 1; i++)
      console.log(elems[i].name, elems[i].value);

    console.log("command submitted");
  };

  return (
    <>
      <div>
        <Modal open={show} onClose={onClose}>
          <div className={classes.modal}>
            <div className={classes.closeWrapper}>
              <div className={classes.closeButton} onClick={onClose}>
                <Close />
              </div>
            </div>
            <Typography variant="h6">Send Command Modal</Typography>
            <div>
              <CommandForm onSubmit={onSubmit} classes={classes} />
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
