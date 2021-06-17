import React from "react";
import {
  makeStyles,
  Paper,
  ListItemText,
  ListItem,
  Collapse,
} from "@material-ui/core";
import { Schedule, ExpandLess, ExpandMore } from "@material-ui/icons";
import { IntervalsPickerForm } from "../Forms/IntervalsPickerForm";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    width: "100%",
  },
}));

export const DateFilter = ({ onFilter }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const {
      start_time: { value: startTime },
      end_time: { value: endTime },
    } = event.target.elements;
    onFilter(startTime, endTime);
  };

  return (
    <>
      <div className={classes.wrapper}>
        <Paper style={{ marginTop: 5 }}>
          <ListItem
            button
            onClick={handleClick}
            style={{ paddingTop: 0, paddingBottom: 0 }}
          >
            <ListItemText
              primary={"Date time filter"}
              primaryTypographyProps={{ style: { fontSize: 16 } }}
            />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <IntervalsPickerForm
              submitIcon={<Schedule htmlColor="blue" />}
              onSubmit={onSubmit}
              onResetFilter={() => onFilter("", "")}
            />
          </Collapse>
        </Paper>
      </div>
    </>
  );
};
