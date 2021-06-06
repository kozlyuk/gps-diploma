import React from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { useFormik } from "formik";
import * as yup from "yup";

export const Register = ({ classes, setupUserAndRedirect }) => {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    name: yup
      .string("Enter your name")
      .trim()
      .min(2, "Enter more then 2 characters")
      .required("Name is required"),
    phone: yup
      .string("Enter your phone number")
      .matches(/^[0-9]+$/, "Must be only digits")
      .min(10, "Must be exactly 10 digits")
      .max(10, "Must be exactly 10 digits")
      .required("Phone is required"),
    password: yup
      .string("Enter your password")
      .trim()
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      phone: "",
      name: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      onSubmitRegistration(values);
    },
  });

  const onSubmitRegistration = (values) => {
    const { email, phone, password, name } = values;
    const data = { email, phone, password };
    console.log(data);
    //  send post to backend
    //  get data
    const user = {
      id: "00349240923",
      token: "327648263487326487263487632748632764872364786234",
      email,
      phoneNumber: "+380970000000",
      name,
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
          type="text"
          name="name"
          label="Name-Surname"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          placeholder="Your name..."
          required
        />
      </FormControl>
      <FormControl className={classes.input} fullWidth>
        <TextField
          type="tel"
          name="phone"
          label="Phone number"
          value={formik.values.phone}
          onChange={formik.handleChange}
          error={formik.touched.phone && Boolean(formik.errors.phone)}
          helperText={formik.touched.phone && formik.errors.phone}
          FormHelperTextProps={{ style: { maxWidth: 250 } }}
          placeholder="Your phone number..."
          inputProps={{ maxLength: 10, minLength: 10 }}
          required
        />
      </FormControl>
      <FormControl className={classes.input} fullWidth>
        <TextField
          type="password"
          name="password"
          label="Password"
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
        startIcon={<PersonAdd />}
      >
        Register
      </Button>
    </form>
  );
};
