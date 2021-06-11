import React from "react";
import {
  FormControl,
  TextField,
  Button,
  Select,
  InputLabel,
  MenuItem,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as yup from "yup";
import { useFormik } from "formik";
import { StoreContext } from "../../store/StoreContext";

export const DepartmentForm = ({
  onSubmit,
  classes,
  department,
  buttonTitle = "Add",
  endIcon = <Add />,
}) => {
  const { company } = React.useContext(StoreContext);

  const validationSchema = yup.object({
    departmentName: yup
      .string("Enter department name")
      .min(2, "Minimum 2 characters")
      .required("Department is required"),
    company: yup.string("Select company").required("Company is required"),
  });

  const formik = useFormik({
    initialValues: {
      departmentName: department?.name ?? "",
      company: department?.company ?? "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
      <FormControl className={classes.textField}>
        <InputLabel id="company-input">Company</InputLabel>
        <Select
          id="company-input"
          value={formik.values.company}
          onChange={formik.handleChange}
          error={formik.touched.company && Boolean(formik.errors.company)}
          helperText={formik.touched.company && formik.errors.company}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          name="company"
          style={{ textAlign: "left" }}
          required
        >
          {company?.map((comp) => (
            <MenuItem key={comp.id.toString()} value={comp.id}>
              {comp.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <TextField
          label="Department name"
          type="text"
          name="departmentName"
          className={classes.textField}
          value={formik.values.departmentName}
          onChange={formik.handleChange}
          error={
            formik.touched.departmentName &&
            Boolean(formik.errors.departmentName)
          }
          helperText={
            formik.touched.departmentName && formik.errors.departmentName
          }
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          required
        />
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
