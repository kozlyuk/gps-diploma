import React from "react";
import { Box } from "@material-ui/core";

export const TabPanel = (props) => {
  const { children, value, index } = props;

  return <div>{value === index && <Box> {children} </Box>}</div>;
};
