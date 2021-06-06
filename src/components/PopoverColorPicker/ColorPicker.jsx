import React from "react";
import { HexColorPicker } from "react-colorful";
import { makeStyles } from "@material-ui/core";

import useClickOutside from "./useClickOutside";

const useStyles = makeStyles({
  picker: {
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  swatch: {
    width: 25,
    height: 25,
    borderRadius: 8,
    border: "3px solid #fff",
    boxShadow:
      "0 0 0 1px rgba(0, 0, 0, 0.1), inset 0 0 0 1px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  popover: {
    position: "absolute",
    top: "calc(100% + 2px)",
    left: 0,
    borderRadius: 9,
    boxShadow: "0 6px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
  },
  text: {
    marginRight: 20,
  },
});

export const ColorPicker = ({ color, onChange }) => {
  const classes = useStyles();
  const popover = React.useRef();
  const [isOpen, toggle] = React.useState(false);

  const close = React.useCallback(() => toggle(false), []);
  useClickOutside(popover, close);

  return (
    <div className={classes.picker}>
      <p className={classes.text}>Color: {"   "}</p>
      <div
        className={classes.swatch}
        style={{ backgroundColor: color }}
        onClick={() => toggle(true)}
      />
      {isOpen && (
        <div className={classes.popover} ref={popover}>
          <HexColorPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
};
