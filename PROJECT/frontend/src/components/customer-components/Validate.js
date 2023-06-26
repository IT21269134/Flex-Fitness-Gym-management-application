import toast from "react-hot-toast";
import { authenticate } from "./helper.js";

// validate login page username
export async function userNameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.name) {
    //check user existance
    const { status } = await authenticate(values.name);

    if (status !== 200) {
      errors.exist = toast.error("User does not exist");
    }
  }
  return errors;
}

// validate password
export async function passwordValidate(values) {
  const errors = passwordVerify({}, values);
  return errors;
}

// validate reset password
export async function resetPasswordValidation(values) {
  const errors = passwordVerify({}, values);

  if (values.password !== values.confirm_pwd) {
    errors.exist = toast.error("Password Not Match..");
  }

  return errors;
}

// validate register form
export async function registerValidation(values) {
  const errors = usernameVerify({}, values);
  emailVerify(errors, values);
  passwordVerify(errors, values);
  return errors;
}

// validate profile page
export async function profileValidation(values) {
  const errors = emailVerify({}, values);
  return errors;
}

// *************************************************************************************************************

// function validate password
function passwordVerify(errors = {}, values) {
  const specialChars = /[-’/`~!#*$@_%+=.,^&(){}[\]|;:”<>?\\]/g;

  if (!values.password) {
    errors.password = toast.error("Password Required..!!");
  } else if (values.password.includes(" ")) {
    errors.password = toast.error("Wrong Password..!!");
  } else if (values.password.length < 4) {
    errors.password = toast.error(
      "Password must be more than 4 characters long."
    );
  } else if (!specialChars.test(values.password)) {
    errors.password = toast.error("Password must have special characters.");
    return errors;
  }
}

// function Validate User
function usernameVerify(error = {}, values) {
  if (!values.name) {
    error.name = toast.error("Username Required..!!");
  } else if (values.name.includes(" ")) {
    error.name = toast.error("Invalid Username..!!");
  }

  return error;
}

// function validate email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.email = toast.error("Email Required..!!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid Email..!!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    error.email = toast.error("Invalid Email address..!!");
  }

  return error;
}
