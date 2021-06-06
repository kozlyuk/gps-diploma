import React from "react";
import { FormControl, TextField, Button } from "@material-ui/core";
import { Add } from "@material-ui/icons";

export const DepartmentForm = ({
  onSubmit,
  classes,
  depName,
  buttonTitle = "Add",
  endIcon = <Add />,
}) => {
  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <FormControl>
        <TextField
          label="Department name"
          type="text"
          name="department_name"
          className={classes.textField}
          defaultValue={depName}
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
