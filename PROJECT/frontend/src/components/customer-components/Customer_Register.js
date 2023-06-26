import React, { useState } from "react";
import "./Customer.css";
import styles from "./Customer_Login.module.css";
import { Link, useNavigate } from "react-router-dom";
import avatar from "../../assets/images/CustomerAvatar.jpg";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { registerValidation } from "./Validate";
import convertToBase64 from "./convert";
import { motion } from "framer-motion";
import { registerUser } from "./helper";

export default function Customer_Register() {
  const navigate = useNavigate();
  const [file, setFile] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "@gmail.com",
      password: "admin@123",
      profile: "",
      isCustomer: true,
    },
    validate: registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      let registerPromise = registerUser(values);
      toast.promise(registerPromise, {
        loading: "Creating...",
        success: <b>Register Successfully..! </b>,
        error: <b>Could not register.</b>,
      });

      registerPromise.then(function () {
        navigate("/Customer_Login");
      });
    },
  });

  // formik doesn't suppport the file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <motion.div
      className="container mx-max"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
    >
      <Toaster position="top-center " reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center " id="regi">
        <div className={styles.glass} style={{ width: "45%" }}>
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold py-4">Register</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-5">
              Happy to join you.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={styles.profile_img}
                  alt="avatar"
                />
              </label>
              <input
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                {...formik.getFieldProps("name")}
                className={styles.textbox}
                type="text"
                placeholder="Username*"
                required
              />
              <input
                {...formik.getFieldProps("email")}
                className={styles.textbox}
                type="email"
                placeholder="Email*"
                required
              />
              <input
                {...formik.getFieldProps("password")}
                className={styles.textbox}
                type="password"
                placeholder="Password*"
                required
              />

              <button className={styles.btn} type="submit">
                Register
              </button>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  Already Registered?
                  <Link className="text-red-500" to="/Customer_Login">
                    Login Now
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
