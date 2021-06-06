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

import { ColorPicker } from "../PopoverColorPicker/ColorPicker";
import { StoreContext } from "../../store/StoreContext";

export const CarForm = ({
  onSubmit,
  classes,
  car = null,
  buttonTitle = "Add",
  endIcon = <Add />,
}) => {
  const [color, setColor] = React.useState("#000");
  const { departments } = React.useContext(StoreContext);

  console.log(color);

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <FormControl>
        <TextField
          label="Car imei"
          type="tel"
          name="car_imei"
          className={classes.textField}
          defaultValue={car?.imei ?? ""}
          inputProps={{ maxLength: 15, minLength: 15 }}
          required
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Car number"
          type="text"
          name="car_number"
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
      <FormControl>
        <TextField
          type="tel"
          name="phone"
          label="Car sim card number"
          defaultValue={car?.simCardNumber ?? ""}
          inputProps={{ maxLength: 10, minLength: 10 }}
          className={classes.textField}
          required
        />
      </FormControl>
      <ColorPicker color={color} onChange={setColor} />
      <FormControl className={classes.textField}>
        <InputLabel id="department-input">Filter</InputLabel>
        <Select
          id="department-input"
          defaultValue={car?.department ?? ""}
          name="department"
          style={{ textAlign: "left" }}
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
