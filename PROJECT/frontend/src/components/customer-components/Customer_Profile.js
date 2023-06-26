import React, { useState } from "react";
import "./Customer.css";

import axios from "axios";
import { Link } from "react-router-dom";
import avatar from "../../assets/images/CustomerAvatar.jpg";
import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "./Validate";
import convertToBase64 from "./convert";
import useFetch from "../../hooks/inventory-hooks/customer-hooks/customerFetch.hook";
import { useAuthStore } from "./store.js";
import { updateUser } from "./helper";

import { useNavigate } from "react-router-dom";

import extend from "./profile.module.css";
import styles from "./Customer_Login.module.css";
import { motion } from "framer-motion";

export default function Customer_Profile() {
  const [file, setFile] = useState();
  const [{ isloading, apiData, serverError }] = useFetch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: apiData?.firstName || "",
      lastName: apiData?.lastName || "",
      email: apiData?.email || "",
      mobile: apiData?.mobile || "",
      address: apiData?.address || "",
    },
    enableReinitialize: true,
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, {
        profile: file || apiData?.profile || "",
      });
      let updatePromise = updateUser(values);
      toast.promise(updatePromise, {
        loading: "Creating...",
        success: <b>Update Successfully..! </b>,
        error: <b>Could not Update!</b>,
      });
    },
  });

  // formik doesn't suppport the file upload so we need to create this handler
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  // logout handler function

  function userLogout() {
    localStorage.removeItem("token");
    navigate("/Customer_Login");
  }

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
     
      <div className="flex justify-center items-center ">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%" }}
        >
          
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold py-4">Profile</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-5">
              You can update your Details.
            </span>
          </div>

          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={apiData?.profile || file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
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
              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("firstName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="First Name"
                />
                <input
                  {...formik.getFieldProps("lastName")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="text"
                  placeholder="Last Name"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  {...formik.getFieldProps("email")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="email"
                  placeholder="Email"
                />
                <input
                  {...formik.getFieldProps("mobile")}
                  className={`${styles.textbox} ${extend.textbox}`}
                  type="phone"
                  placeholder="Contact Number"
                />
              </div>

              <input
                {...formik.getFieldProps("address")}
                className={`${styles.textbox} ${extend.textbox}`}
                type="textArea"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>

              <button onClick={userLogout} className={styles.btn1} to="/">
                Delete
              </button>

              <div className="text-center py-4">
                <span className="text-gray-500">
                  come back later?
                  <button onClick={userLogout} className="text-red-500" to="/">
                    LogOut
                  </button>
                </span>
              </div>
            </div>
          </form>
        </div>

        <div className="flex justify-center items-center min-h-screen">
      {/* <div className={styles.glass}> */}
        <div className="title flex flex-col items-center">

          <span className="py-2 text-xl w-2/3 text-center text-gray-5"></span>
          <form className="py-1">
            <Link to="/Nutrition_home">
              <button className={styles.btnProfileNutrition}>Nutrition Tracking</button>
            </Link>
            <br />
            <br />
            <Link to="/Fitness_home">
              <button className={styles.btnProfileFitness}> Fitness Tracking</button>
            </Link>
            <br />
            <br />
            <Link to="/">
              <button className={styles.btnProfile}> Home</button>
            </Link>
            <br />
          </form>
        {/* </div> */}
      </div>
    </div>
      </div>

    </motion.div>
  );
}
