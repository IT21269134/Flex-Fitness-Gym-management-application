import React from "react";
import "./Customer.css";
import styles from "./Customer_Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/CustomerAvatar.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "./Validate";
import { motion } from "framer-motion";
import useFetch from "../../hooks/inventory-hooks/customer-hooks/customerFetch.hook";
import { useAuthStore } from "./store.js";
import { verifyPassword } from "./helper";

export default function Customer_Password() {
  const navigate = useNavigate();
  const { username } = useAuthStore((state) => state.auth);
  const [{ isloading, apiData, serverError }] = useFetch(`user/${username}`);

  const formik = useFormik({
    initialValues: {
      password: "admin@123",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      let loginPromise = verifyPassword({
        username,
        password: values.password,
      });
      toast.promise(loginPromise, {
        loading: "Creating...",
        success: <b>Login Successfully..! </b>,
        error: <b>Password not match.</b>,
      });

      loginPromise.then((res) => {
        let { token } = res.data;
        localStorage.setItem("token", token);
        navigate("/Customer_Profile");
      });
    },
  });

  if (isloading) return <h1 className="text-2xl font-bold">isLoading</h1>;
  if (serverError)
    return <h1 className="text-xl text-red-500">{serverError.message}</h1>;

  return (
    <motion.div
      className="container mx-max"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <Toaster position="top-center " reverseOrder={false}></Toaster>
      <div className="flex justify-center items-center max-h-screen">
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold py-4">
              Hello {apiData?.firstName || apiData?.username}
            </h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-5">
              Explore More by <br />
              connect with us.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <img
                src={apiData?.profile || avatar}
                className={styles.profile_img}
                alt="avatar"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />
              <button className={styles.btn} type="submit">
                Sign In
              </button>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Forgot Password?
                  <Link className="text-red-500" to="/Customer_Recovery">
                    Recover Now
                  </Link>
                </span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
