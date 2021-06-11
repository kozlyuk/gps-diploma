import React from "react";
import {
  Select,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
  Button,
} from "@material-ui/core";
import { RotateLeft } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
  },

  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  resetButton: {
    minWidth: 40,
    marginBottom: 5,
  },
}));

export const Filter = ({ filters, values, onSetFilterValue }) => {
  const classes = useStyles();
  const [filter, setFilter] = React.useState("");
  const [value, setValue] = React.useState("");

  const handleChange = (event) => {
    if (event.target.name === "filter") {
      onSetFilterValue("", "");
      setFilter(event.target.value);
    } else if (event.target.name === "value") {
      setValue(event.target.value);
      onSetFilterValue(filter, event.target.value);
    }
  };

  const reset = () => {
    onSetFilterValue("", "");
    setValue("");
    setFilter("");
  };

  return (
    <>
      <div className={classes.wrapper}>
        <FormControl className={classes.formControl}>
          <InputLabel id="filter-value-input">Filter</InputLabel>
          <Select
            labelId="filter"
            id="filter-value-input"
            value={filter}
            onChange={handleChange}
            name="filter"
          >
            {filters?.map((filter, i) => (
              <MenuItem key={i} value={filter}>
                {filter}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel id="filter-value-input">Value</InputLabel>
          <Select
            labelId="filter-value"
            id="filter-value-input"
            value={value}
            onChange={handleChange}
            name="value"
            disabled={filter === ""}
          >
            {values[filter]?.map((v) => (
              <MenuItem key={v.id.toString()} value={v.id}>
                {v.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button
          className={classes.resetButton}
          onClick={reset}
          title="Reset filter"
        >
          <RotateLeft />
        </Button>
      </div>
    </>
  );
};
