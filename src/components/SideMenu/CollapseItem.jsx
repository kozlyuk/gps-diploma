import React from "react";
import {
  Collapse,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CarItem } from "./CarItem";

export const CollapseItem = ({ items, title }) => {
  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {items.map((car) => (
            <CarItem key={car.id} car={car} />
          ))}
        </List>
      </Collapse>
    </>
  );
};
