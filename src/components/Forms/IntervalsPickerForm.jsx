import React from "react";
import { TextField, IconButton, makeStyles } from "@material-ui/core";
import { Explore, RotateLeft } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
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
  submitButtons: {
    marginTop: 5,
  },
}));

export const IntervalsPickerForm = ({
  onSubmit,
  resetIcon = <RotateLeft />,
  submitIcon = <Explore />,
  onResetFilter = () => {},
}) => {
  const classes = useStyles();
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");

  const onChange = (event) => {
    if (event.target.name === "start_time") setStartDate(event.target.value);
    else if (event.target.name === "end_time") setEndDate(event.target.value);
  };

  const reset = () => {
    onResetFilter();
    setStartDate("");
    setEndDate("");
  };

  console.log(
    `${new Date(Date.now()).toISOString().slice(0, 10)}T${new Date(Date.now())
      .toLocaleTimeString()
      .slice(0, 5)}`
  );

  return (
    <>
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
            value={startDate}
            InputProps={{
              inputProps: {
                max: `${new Date(Date.now())
                  .toISOString()
                  .slice(0, 10)}T${new Date(Date.now())
                  .toLocaleTimeString()
                  .slice(0, 5)}`,
              },
            }}
            required
          />
          <TextField
            label="End date time"
            type="datetime-local"
            name="end_time"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={endDate}
            onChange={onChange}
            disabled={startDate === ""}
            InputProps={{
              inputProps: {
                max: `${new Date(Date.now())
                  .toISOString()
                  .slice(0, 10)}T${new Date(Date.now())
                  .toLocaleTimeString()
                  .slice(0, 5)}`,
                min:
                  startDate !== ""
                    ? `${new Date(startDate)
                        ?.toISOString()
                        ?.slice(0, 10)}T${new Date(startDate)
                        ?.toLocaleTimeString()
                        ?.slice(0, 5)}`
                    : "",
              },
            }}
            required
          />
        </div>
        <div className={classes.submitButtons}>
          <IconButton
            type="submit"
            variant="contained"
            color="secondary"
            size="small"
          >
            {submitIcon}
          </IconButton>
          <IconButton
            variant="outlined"
            color="secondary"
            size="small"
            onClick={reset}
          >
            {resetIcon}
          </IconButton>
        </div>
      </form>
    </>
  );
};
