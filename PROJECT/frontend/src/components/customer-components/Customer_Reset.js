import React, { useEffect } from "react";
import "./Customer.css";
import styles from "./Customer_Login.module.css";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { resetPasswordValidation } from "./Validate";
import { motion } from "framer-motion";
import { resetPassword } from "./helper";
import { useAuthStore } from "./store";
import { useNavigate, Navigate } from "react-router-dom";
import useFetch from "../../hooks/inventory-hooks/customer-hooks/customerFetch.hook";

export default function Customer_Reset() {
  const { username } = useAuthStore((state) => state.auth);
  const navigate = useNavigate();
  const [{ isloading, apiData, status, serverError }] =
    useFetch("createResetSession");

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
      confirm_pwd: "admin@123",
    },

    validate: resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let resetPromise = resetPassword({ username, password: values.password });

      toast.promise(resetPromise, {
        loading: "Updating...!",
        success: <b>Reset Successfully..</b>,
        error: <b>Couldnot Reset!</b>,
      });

      resetPromise.then(function () {
        navigate("/Custmoer_Password");
      });
    },
  });

  if (isloading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;
  if (status !== 201)
    return <Navigate to={"/Customer_Password"} replace={true}></Navigate>;

  return (
    <motion.div
      className="container mx-max"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <Toaster position="top-center " reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center max-h-screen">
        <div className={styles.glass} style={{ width: "50%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold py-4">Reset</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-5">
              Enter new Password.
            </span>
          </div>

          <form className="pt-20" onSubmit={formik.handleSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="text"
                placeholder="New Password"
              />
              <input
                {...formik.getFieldProps("confirm_pwd")}
                className={styles.textbox}
                type="text"
                placeholder="Confirm Password"
              />
              <button className={styles.btn} type="submit">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
