import React from "react";
import {
  FormControl,
  TextField,
  Button,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { StoreContext } from "../../store/StoreContext";

export const CarForm = ({
  onSubmit,
  classes,
  car = null,
  buttonTitle = "Add",
  endIcon = <Add />,
}) => {
  const { departments } = React.useContext(StoreContext);
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <FormControl>
        <TextField
          label="Car number"
          type="text"
          name="car_id"
          className={classes.textField}
          defaultValue={car?.id ?? ""}
          required
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Car model"
          type="text"
          name="car_model"
          className={classes.textField}
          defaultValue={car?.model ?? ""}
          required
        />
      </FormControl>
      <FormControl className={classes.textField}>
        <InputLabel id="department-input">Filter</InputLabel>
        <Select
          id="department-input"
          defaultValue={car?.department ?? ""}
          name="department"
          style={{textAlign: "left"}}
          required
        >
          {departments?.map((dep) => (
            <MenuItem key={dep.id.toString()} value={dep.name}>
              {dep.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        endIcon={endIcon}
      >
        {buttonTitle}
      </Button>
    </form>
  );
};
