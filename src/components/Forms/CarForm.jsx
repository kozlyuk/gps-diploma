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
import * as yup from "yup";
import { useFormik } from "formik";

import { ColorPicker } from "../PopoverColorPicker/ColorPicker";
import { StoreContext } from "../../store/StoreContext";

export const CarForm = ({
  onSubmit,
  classes,
  car = null,
  buttonTitle = "Add",
  endIcon = <Add />,
}) => {
  const [color, setColor] = React.useState(car === null ? "#000" : car.color);
  const { departments, models } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    trackerIMEI: yup
      .string("Enter tracker IMEI")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(15, "Must contain 15 characters")
      .max(15, "Must contain 15 characters")
      .required("Tracker IMEI is required"),
    carNumber: yup
      .string("Enter car number")
      .min(8, "Must contain 8 characters")
      .max(8, "Must contain 8 characters")
      .required("Car number is required"),
    model: yup
      .string("Enter car model")
      .min(3, "Minimum 3 characters")
      .required("Tracker IMEI is required"),
    trackerSimNumber: yup
      .string("Enter tracker sim number")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must contain 10 characters")
      .max(10, "Must contain 10 characters")
      .required("Tracker sim number is required"),
    department: yup
      .string("Select department")
      .required("Department is required"),
  });

  const formik = useFormik({
    initialValues: {
      trackerIMEI: car?.sim_imei ?? "",
      carNumber: car?.number ?? "",
      model: car?.model ?? "",
      trackerSimNumber: car?.sim_number ?? "",
      department: car?.department ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmit({ ...values, color });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <FormControl>
        <TextField
          label="Car imei"
          type="tel"
          name="trackerIMEI"
          className={classes.textField}
          value={formik.values.trackerIMEI}
          onChange={formik.handleChange}
          error={
            formik.touched.trackerIMEI && Boolean(formik.errors.trackerIMEI)
          }
          helperText={formik.touched.trackerIMEI && formik.errors.trackerIMEI}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          inputProps={{ maxLength: 15, minLength: 15 }}
          required
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Car number"
          type="text"
          name="carNumber"
          className={classes.textField}
          value={formik.values.carNumber}
          onChange={formik.handleChange}
          error={formik.touched.carNumber && Boolean(formik.errors.carNumber)}
          helperText={formik.touched.carNumber && formik.errors.carNumber}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          inputProps={{ maxLength: 8, minLength: 8 }}
          required
        />
      </FormControl>
      <FormControl className={classes.textField}>
        <InputLabel id="model-input">Model</InputLabel>
        <Select
          id="model-input"
          value={formik.values.model}
          onChange={formik.handleChange}
          error={formik.touched.model && Boolean(formik.errors.model)}
          helperText={formik.touched.model && formik.errors.model}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          name="model"
          style={{ textAlign: "left" }}
          required
        >
          {models?.map((model) => (
            <MenuItem key={model.id.toString()} value={model.id}>
              {model.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          type="tel"
          name="trackerSimNumber"
          label="Car sim card number"
          value={formik.values.trackerSimNumber}
          onChange={formik.handleChange}
          error={
            formik.touched.trackerSimNumber &&
            Boolean(formik.errors.trackerSimNumber)
          }
          helperText={
            formik.touched.trackerSimNumber && formik.errors.trackerSimNumber
          }
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          inputProps={{ maxLength: 10, minLength: 10 }}
          className={classes.textField}
          required
        />
      </FormControl>
      <TextField type="hidden" name="color" value={color} />
      <ColorPicker color={color} onChange={setColor} />
      <FormControl className={classes.textField} style={{marginTop: 10}}>
        <InputLabel id="department-input" style={{ marginTop: -15 }}>
          Department
        </InputLabel>
        <Select
          id="department-input"
          value={formik.values.department}
          onChange={formik.handleChange}
          error={formik.touched.department && Boolean(formik.errors.department)}
          helperText={formik.touched.department && formik.errors.department}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          name="department"
          style={{ textAlign: "left", marginTop: 0 }}
          required
        >
          {departments?.map((dep) => (
            <MenuItem key={dep.id.toString()} value={dep.id}>
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
        style={{ marginTop: 15 }}
      >
        {buttonTitle}
      </Button>
    </form>
  );
};
