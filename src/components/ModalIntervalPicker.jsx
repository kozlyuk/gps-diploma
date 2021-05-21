import React from "react";
import { Modal, makeStyles, TextField, Button } from "@material-ui/core";
import { Close, Explore } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginBottom: 20
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
            <form className={classes.container}>
              <div>
                <TextField
                  label="Start date time"
                  type="datetime-local"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  label="End date time"
                  type="datetime-local"
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
