import React from "react";
import { Box } from "@material-ui/core";

export const TabPanel = (props) => {
  const { children, value, index, ...rest } = props;

  return <div>{value === index && <Box {...rest}> {children} </Box>}</div>;
};
