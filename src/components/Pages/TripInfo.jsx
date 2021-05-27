import React from "react";
import { useParams } from "react-router-dom";

export const TripInfo = () => {
  const { uuid } = useParams();
  return <div>{uuid}</div>;
};
