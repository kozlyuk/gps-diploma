import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  Button,
} from "@material-ui/core";
import { PersonAdd } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const clientID =
  `${process.env.REACT_APP_GOOGLE_CLIEND_ID}.apps.googleusercontent.com`;

const useStyles = makeStyles((theme) => ({
  wrapper: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30
  },
  input: {
  },
  submitButton: {
    marginTop: 25,
  },
}));

export const Auth = () => {
  const classes = useStyles();

  const responseGoogle = (response) => {
    console.log(response);
  };

  return (
    <div className={classes.wrapper}>
      <form className={classes.form}>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Input
            id="email"
            type="email"
            aria-describedby="my-helper-text"
            required
          />
        </FormControl>
        <FormControl className={classes.input}>
          <InputLabel htmlFor="pass">Password</InputLabel>
          <Input
            id="pass"
            type="password"
            aria-describedby="my-helper-text"
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
      <GoogleLogin
        clientId={clientID}
        buttonText="Увійти за допомогою Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
      <Link to="/app">go to app</Link>
    </div>
  );
};
