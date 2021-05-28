import React from "react";
import {
  makeStyles,
  TextField,
  Paper,
  IconButton,
  ListItemText,
  ListItem,
  Collapse,
} from "@material-ui/core";
import {
  RotateLeft,
  Schedule,
  ExpandLess,
  ExpandMore,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
  },
  textField: {
    marginBottom: 5,
    fontSize: 10,
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: "0px 10px",
  },
  submitButton: {
    marginTop: 5,
  },
}));

export const DateFilter = ({ onFilter }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [start, setStart] = React.useState("");
  const [end, setEnd] = React.useState("");

  const onChange = (event) => {
    if (event.target.name === "start_time") setStart(event.target.value);
    else if (event.target.name === "end_time") setEnd(event.target.value);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const reset = () => {
    setStart("");
    setEnd("");
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      start_time: { value: startTime },
      end_time: { value: endTime },
    } = event.target.elements;
    onFilter(startTime, endTime);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Paper style={{ marginTop: 5 }}>
          <ListItem
            button
            onClick={handleClick}
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <ListItemText
              primary={"Date time filter"}
              primaryTypographyProps={{ style: { fontSize: 16 } }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <form className={classes.container} onSubmit={onSubmit}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  label="Start date time"
                  type="datetime-local"
                  name="start_time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={onChange}
                  value={start}
                  inputProps={{ max: new Date(Date.now()).toString() }}
                />
                <TextField
                  label="End date time"
                  type="datetime-local"
                  name="end_time"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={end}
                  onChange={onChange}
                  disabled={start === ""}
                  inputProps={{ max: new Date(Date.now()) }}
                />
              </div>
              <div>
                <IconButton
                  className={classes.submitButton}
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  title="Filter"
                >
                  <Schedule />
                </IconButton>
                <IconButton
                  className={classes.submitButton}
                  variant="outlined"
                  color="secondary"
                  size="small"
                  onClick={reset}
                >
                  <RotateLeft />
                </IconButton>
              </div>
            </form>
          </Collapse>
        </Paper>
      </div>
    </>
  );
};
