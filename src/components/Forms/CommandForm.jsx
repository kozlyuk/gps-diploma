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

export const CommandForm = ({
  onSubmit,
  classes,
  buttonTitle = "Command",
  endIcon = <Add />,
}) => {
  const [params, setParams] = React.useState([]);

  const onChange = ({ target: { value } }) => {
    console.log(value);
    if (value === "None") {
      setParams([]);
      return;
    }

    //  search params by command name
    const _params = ["2001", "2002", "2003", "2004", "2005", "2006"];
    setParams(_params);
  };

  return (
    <>
      <form onSubmit={onSubmit} className={classes.form}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            width: 400,
            marginBottom: 10,
          }}
        >
          <FormControl className={classes.textField}>
            <TextField
              label="Car login"
              type="text"
              name="car_login"
              defaultValue=""
              inputProps={{ minLength: 8 }}
              fullWidth
              required
            />
          </FormControl>
          <FormControl className={classes.textField}>
            <TextField
              label="Car password"
              type="password"
              name="car_password"
              defaultValue=""
              inputProps={{ minLength: 8 }}
              fullWidth
              required
            />
          </FormControl>
        </div>
        <FormControl className={classes.textField} style={{ marginTop: 15 }}>
          <InputLabel id="command-input" style={{ marginTop: -15 }}>
            Command
          </InputLabel>
          <Select
            id="command-input"
            defaultValue={""}
            name="command"
            style={{ textAlign: "left", marginTop: 0 }}
            onChange={onChange}
            required
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="setParams">setParams</MenuItem>
          </Select>
        </FormControl>

        <div className={classes.argsWrapper}>
          {params?.map((param, i) => (
            <React.Fragment key={i.toString()}>
              <FormControl className={classes.textField}>
                <TextField
                  label={param}
                  type="text"
                  name={param}
                  defaultValue=""
                  fullWidth
                  required
                />
              </FormControl>
            </React.Fragment>
          ))}
        </div>

        <Button
          type="submit"
          variant="contained"
          size="small"
          color="primary"
          endIcon={endIcon}
          style={{ marginTop: 15 }}
        >
          {buttonTitle}
        </Button>
      </form>
    </>
  );
};
