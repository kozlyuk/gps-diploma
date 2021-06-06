import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  IconButton,
} from "@material-ui/core";
import { ExpandLess, ExpandMore, Edit } from "@material-ui/icons";
import { CarItem } from "./";
import { StoreContext } from "../../store/StoreContext";

const useStyles = makeStyles({
  arrow: {
    "&:hover": {
      cursor: "pointer",
    },
  },
});

export const CollapseItem = ({ items, title, show, id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(show);
  const {
    changeShowDepartment,
    modalStore: { setEditingDepartmentID },
  } = React.useContext(StoreContext);

  const handleClick = () => {
    changeShowDepartment(id, !open);
    setOpen(!open);
  };

  const onEditClick = () => {
    setEditingDepartmentID(id);
  };

  return (
    <>
      <ListItem style={{ paddingTop: 0, paddingBottom: 0 }}>
        <ListItemText
          primary={title}
          primaryTypographyProps={{ style: { fontSize: 12 } }}
          onClick={handleClick}
          className={classes.arrow}
        />
        <IconButton size="small" onClick={onEditClick}>
          <Edit style={{ fontSize: 16 }} />
        </IconButton>
        <IconButton
          onClick={handleClick}
          className={classes.arrow}
          size="small"
        >
          {open ? <ExpandLess /> : <ExpandMore />}
        </IconButton>
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((car) => (
            <CarItem key={car.uuid} car={car} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
