import React, { useEffect, useContext, useState } from "react";
import "./Customer.css";
import styles from "./Customer_Login.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import avatar from "../../assets/images/CustomerAvatar.jpg";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { userNameValidate } from "./Validate";
import { motion } from "framer-motion";
import { useAuthStore } from "./store.js";
import Axios from "axios";
import { message } from "antd";

import { Store } from "../Online-shopping-components/Store";
import { toast } from "react-toastify";

export default function Customer_Login() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";
  const { state, dispatch: ctxDispatch } = useContext(Store);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await Axios.post("/api/users/signin", {
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("userInfo", JSON.stringify(data));
      message.success("Login successful");
      navigate(redirect || "/");
    } catch (error) {
      message.error("Username or password are incorrect");
    }
  };

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
            <h4 className="text-5xl font-bold py-4">Hello Again</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-5">
              Explore More by <br />
              connect with us.
            </span>
          </div>

          <form className="py-1" onSubmit={submitHandler}>
            <div className="profile flex justify-center py-4">
              <img src={avatar} className={styles.profile_img} alt="avatar" />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                onChange={(e) => setEmail(e.target.value)}
                className={styles.textbox}
                type="text"
                placeholder="Username"
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                className={styles.textbox}
                type="password"
                placeholder="Password"
              />

              <button className={styles.btn} type="submit">
                Let's Go
              </button>

              <div className="text-center py-4"></div>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
}
