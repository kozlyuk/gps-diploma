import React from "react";
import {
  FormControl,
  InputLabel,
  Input,
  makeStyles,
  Button,
  Tabs,
  Tab,
} from "@material-ui/core";
import { PersonAdd, Person } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { TabPanel } from "../TabPanel";
import { StoreContext } from "../../store/StoreContext";

const clientID = `${process.env.REACT_APP_GOOGLE_CLIEND_ID}.apps.googleusercontent.com`;

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
    marginBottom: 30,
  },
  input: {},
  submitButton: {
    marginTop: 25,
    backgroundColor: "gold",
    "&:hover": {
      backgroundColor: "green",
    },
  },
}));

export const Auth = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const history = useHistory();

  const {
    userStore: { setUserData },
  } = React.useContext(StoreContext);

  const setupUserAndRedirect = (user) => {
    setUserData(user);
    history.push("/app");
  };

  const responseGoogle = (response) => {
    console.log(response);
    if (response.error) return;
    const user = {
      id: response.googleId,
      token: response.accessToken,
      email: response.profileObj.email,
      phoneNumber: "+380970000000",
      name: response.profileObj.name,
    };
    setupUserAndRedirect(user);
  };

  const onSubmitRegistration = (event) => {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = event.target.elements;
    const data = { email, password };
    console.log(data);
    //  send post to backend
    //  get data
    const user = {
      id: "00349240923",
      token: "327648263487326487263487632748632764872364786234",
      email,
      phoneNumber: "+380970000000",
      name: "Your Name Here",
    };
    setupUserAndRedirect(user);
  };

  const onSubmitLogin = (event) => {
    event.preventDefault();
    const {
      email: { value: email },
      password: { value: password },
    } = event.target.elements;
    const data = { email, password };
    console.log(data);
    //  send post to backend
    //  get data
    const user = {
      id: "00349240923",
      token: "327648263487326487263487632748632764872364786234",
      email,
      phoneNumber: "+380970000000",
      name: "Your Name Here",
    };
    setupUserAndRedirect(user);
  };

  return (
    <div className={classes.wrapper}>
      <Tabs value={value} onChange={handleChange}>
        <Tab className={classes.tab} label="Registration" value={0} />
        <Tab className={classes.tab} label="Log In" value={1} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <form className={classes.form} onSubmit={onSubmitRegistration}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" type="email" name="email" required />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="pass">Password</InputLabel>
            <Input id="pass" type="password" name="password" required />
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <form className={classes.form} onSubmit={onSubmitLogin}>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="email">Email address</InputLabel>
            <Input id="email" type="email" name="email" required />
          </FormControl>
          <FormControl className={classes.input}>
            <InputLabel htmlFor="pass">Password</InputLabel>
            <Input id="pass" type="password" name="password" required />
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
      </TabPanel>

      <GoogleLogin
        clientId={clientID}
        buttonText="Увійти за допомогою Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};
