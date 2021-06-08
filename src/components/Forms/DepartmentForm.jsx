import React from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import * as yup from "yup";
import { useFormik } from "formik";

export const DepartmentForm = ({
  onSubmit,
  classes,
  depName,
  buttonTitle = "Add",
  endIcon = <Add />,
}) => {
  const validationSchema = yup.object({
    departmentName: yup
      .string("Enter department name")
      .min(2, "Minimum 2 characters")
      .required("Department is required"),
  });

  const formik = useFormik({
    initialValues: {
      departmentName: depName,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      //alert(JSON.stringify(values, null, 2));
      onSubmit(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={classes.form}>
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
