import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
const FomrDatePicker = ({ name, ...otherProps }) => {
  const [Field, mata] = useField(name);
  const configDatePicker = {
    type: "date",
    ...Field,
    ...otherProps,
    varient: "outlined",
    fullWidth: true,
    InputLabelProps: { shirnk: true },
  };
  if (mata && mata.touched && mata.error) {
    configDatePicker.error = true;
    configDatePicker.helperText = mata.error;
  }
  return <TextField {...configDatePicker} />;
};
export default FomrDatePicker;
