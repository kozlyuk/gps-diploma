import React from "react";
import { Collapse, List, ListItem, ListItemText } from "@material-ui/core";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { CarItem } from "./";
import { StoreContext } from "../../store/StoreContext";

export const CollapseItem = ({ items, title, show, id }) => {
  const [open, setOpen] = React.useState(show);
  const { changeShowDepartment } = React.useContext(StoreContext);

  const handleClick = () => {
    changeShowDepartment(id, !open);
    setOpen(!open);
  };

  return (
    <>
      <ListItem button onClick={handleClick} style={{paddingTop: 0, paddingBottom: 0}}>
        <ListItemText primary={title} primaryTypographyProps={{ style: { fontSize: 12 } }} />
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
