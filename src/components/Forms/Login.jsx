import React from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import { Person } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";

export const Login = ({ classes, setupUserAndRedirect }) => {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSubmitLogin(values);
    },
  });

  const onSubmitLogin = (values) => {
    const { email, password } = values;
    const data = { email, password };
    console.log(data);
    //  send post to backend
    //  get data
    const user = {
      id: "109894568165644478206",
      token: "1e73e206c0071415e56d7c746ea177b13f3ed427",
      email,
      phoneNumber: "0970000254",
      name: "Name",
    };
    setupUserAndRedirect(user);
  };

  return (
    <form className={classes.form} onSubmit={formik.handleSubmit}>
      <FormControl className={classes.input} fullWidth>
        <TextField
          type="text"
          name="email"
          label="Email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          placeholder="Your email..."
          required
        />
      </FormControl>
      <FormControl className={classes.input} fullWidth>
        <TextField
          label="Password"
          type="password"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          placeholder="Your password..."
          inputProps={{ minLength: 8 }}
          required
        />
      </FormControl>
      <Button
        className={classes.submitButton}
        variant="contained"
        color="primary"
        type="submit"
        startIcon={<Person />}
      >
        Log In
      </Button>
    </form>
  );
};
