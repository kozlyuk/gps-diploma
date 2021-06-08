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
  const [color, setColor] = React.useState("#000");
  const { departments } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    trackerIMEI: yup
      .string("Enter tracker IMEI")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(15, "Must contain 15 characters")
      .max(15, "Must contain 15 characters")
      .required("Tracker IMEI is required"),
    carNumber: yup
      .string("Enter car number")
      .min(5, "Minimum 5 characters")
      .required("Car number is required"),
    carModel: yup
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
      trackerIMEI: car?.imei ?? "",
      carNumber: car?.number ?? "",
      carModel: car?.model ?? "",
      trackerSimNumber: car?.simCardNumber ?? "",
      department: car?.department ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
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
          required
        />
      </FormControl>
      <FormControl>
        <TextField
          label="Car model"
          type="text"
          name="carModel"
          className={classes.textField}
          value={formik.values.carModel}
          onChange={formik.handleChange}
          error={formik.touched.carModel && Boolean(formik.errors.carModel)}
          helperText={formik.touched.carModel && formik.errors.carModel}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          required
        />
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
      <FormControl className={classes.textField}>
        <InputLabel id="department-input" style={{ marginTop: -15 }}>
          Filter
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
        style={{ marginTop: 15 }}
      >
        {buttonTitle}
      </Button>
    </form>
  );
};
