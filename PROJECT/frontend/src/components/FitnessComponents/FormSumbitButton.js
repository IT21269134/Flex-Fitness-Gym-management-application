import { Button } from "@mui/material";
import { useFormikContext } from "formik";

const ButtonWrapper = ({ children, ...otherProps }) => {
  const { submitForm } = useFormikContext();
  const handleSubmit = () => {
    submitForm();
  };
  const configSubmit = {
    variant: "contained",
    color: "primary",
    fullWidth: true,
    onClick: handleSubmit,
  };

  return <Button {...configSubmit}>{children}</Button>;
};

export default ButtonWrapper;
