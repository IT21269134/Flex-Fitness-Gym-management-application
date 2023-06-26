import React from "react";
import { TextField } from "@mui/material";
import { useField } from "formik";
const TextFieldWrapper = ({ name, ...otherProps }) => {
  const [Field, mata] = useField(name);
  const configTextField = {
    ...Field,
    ...otherProps,
    varient: "outlined",
    fullWidth: true,
  };
  if (mata && mata.touched && mata.error) {
    configTextField.error = true;
    configTextField.helperText = mata.error;
  }
  return <TextField {...configTextField} />;
};
export default TextFieldWrapper;
