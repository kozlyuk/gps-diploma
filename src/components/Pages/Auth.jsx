import React from "react";
import { makeStyles, Tabs, Tab } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

import { TabPanel } from "../TabPanel";
import { StoreContext } from "../../store/StoreContext";
import { Register } from "../Forms/Register";
import { Login } from "../Forms/Login";

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
    minHeight: 250,
    minWidth: 250,
  },
  input: {
    marginBottom: 5,
  },
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
    history.push("/");
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

  return (
    <div className={classes.wrapper}>
      <Tabs value={value} onChange={handleChange}>
        <Tab className={classes.tab} label="Log In" value={0} />
        <Tab className={classes.tab} label="Registration" value={1} />
      </Tabs>
      <TabPanel value={value} index={1}>
        <Register
          classes={classes}
          setupUserAndRedirect={setupUserAndRedirect}
        />
      </TabPanel>
      <TabPanel value={value} index={0}>
        <Login classes={classes} setupUserAndRedirect={setupUserAndRedirect} />
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
