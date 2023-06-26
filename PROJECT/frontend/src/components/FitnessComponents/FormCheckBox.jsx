import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
} from "@mui/material";
import { useField, useFormikContext } from "formik";

const FormCheckBox = ({ name, label, legend, ...otherProps }) => {
  const [field, meta] = useField(name);
  const { setFieldValue } = useFormikContext();
  const hadnleChange = (evt) => {
    const { checked } = evt.target;
    evt.stopPropagation();
    setFieldValue(name, checked);
  };
  const configCheckBox = {
    ...field,
    onchange: hadnleChange,
  };

  const configeFormControl = {};
  if (meta && meta.touched && meta.error) {
    configeFormControl.error = true;
  }
  return (
    <Paper sx={{ marginTop: "2rem", marginLeft: "0.5rem" }}>
      <FormControl>
        <Grid
          container
          alignItems="center"
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Grid item sx={{ marginLeft: "2rem" }}>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    {...configCheckBox}
                    checked={field.value} // Use the `field.value` to determine if the checkbox is checked
                    sx={{
                      "& .MuiSvgIcon-root": {
                        fontSize: "2rem",
                        color: field.value ? "#e48f0f" : undefined, // Apply gold color when the checkbox is checked
                      },
                    }}
                  />
                }
                label={label}
              />
            </FormGroup>
          </Grid>
          <Grid item>
            <FormLabel
              component="legend"
              sx={{
                fontSize: "1.5rem",
                lineHeight: 1,
                paddingTop: "1rem",
                paddingLeft: "2rem",
                paddingRight: "2rem",
                color: "#000000",
              }}
            >
              <p>{legend}</p>
            </FormLabel>
          </Grid>
        </Grid>
      </FormControl>
    </Paper>
  );
};

export default FormCheckBox;
