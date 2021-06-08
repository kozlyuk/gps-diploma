import React from "react";
import {
  makeStyles,
  Modal,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  DialogContentText,
  Slide,
} from "@material-ui/core";
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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const CommandModal = ({ show, onClose }) => {
  const classes = useStyles();

  const [dialogErrorOpen, setDialogErrorOpen] = React.useState(false);
  const [successResponse, setSuccessResponse] = React.useState(false);

  const onSubmit = (event) => {
    event.preventDefault();
    const elems = event.target.elements;
    if (elems.command.value === "None") {
      setDialogErrorOpen(true);
      console.log("Error command is not selected!");
      return;
    }
    console.log(elems);
    //  print param name and value
    for (let i = 3; i < elems.length - 1; i++)
      console.log(elems[i].name, elems[i].value);

    setSuccessResponse("Command response here...");
    console.log("command submitted");
  };

  const handleCloseDialog = () => {
    setDialogErrorOpen(false);
  };

  const handleCloseSuccessDialog = () => {
    setSuccessResponse("");
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
              <Dialog
                open={dialogErrorOpen}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseDialog}
              >
                <DialogTitle style={{ color: "red" }}>
                  {"Error, take another command!"}
                </DialogTitle>
                <DialogActions>
                  <Button onClick={handleCloseDialog} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
              <Dialog
                open={successResponse !== ""}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseSuccessDialog}
              >
                <DialogTitle style={{ color: "green" }}>
                  {"Success"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>{successResponse}</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseSuccessDialog} color="primary">
                    OK
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};
