import React, { useEffect, useState } from "react";
import "./Customer.css";
import styles from "./Customer_Login.module.css";
import { Link } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import { useFormik } from "formik";
import { passwordValidate } from "./Validate";
import { motion } from "framer-motion";
import { useAuthStore } from "../customer-components/store";
import { generateOTP, verifyOTP } from "./helper";
import { useNavigate } from "react-router-dom";

export default function Customer_Recovery() {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  useEffect(() => {
    // console.log(OTP);
    generateOTP(username).then((OTP) => {
      if (OTP) {
        return toast.success("OTP has been send to your email!");
      }
      return toast.error("Problem while generating OTP!");
    });
  }, [username]);

  async function onSubmit(e) {
    e.preventDefault();
    try {
      let { status } = await verifyOTP({ username, code: OTP });
      if (status == 201) {
        toast.success("Verify successfully!");
        return navigate("/Customer_Reset");
      }
    } catch (error) {
      return toast.error("Wrong OTP ! check email again!");
    }
  }

  //handler of resend OTP
  function resendOTP() {
    let sendPromise = generateOTP(username);

    toast.promise(sendPromise, {
      loading: "Sending...!",
      success: <b>OTP has been send to your email!</b>,
      error: <b>Couldnot Send it!</b>,
    });

    sendPromise.then((OTP) => {});
  }

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
            <h4 className="text-5xl font-bold py-4">Recovery</h4>
            <span className="py-2 text-xl w-2/3 text-center text-gray-5">
              Enter OTP to <br />
              Recover password
            </span>
          </div>

          <form className="pt-20" onSubmit={onSubmit}>
            <div className="textbox flex flex-col items-center gap-6">
              <div className="input text-center">
                <span className="py-4 text-sm text-left text-gray-500">
                  Enter 6 digit OTP sent to your email address.
                </span>
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  className={styles.textbox}
                  type="text"
                  placeholder="OTP"
                />
                <Link to="/Customer_Reset">
                  <button className={styles.btn} type="submit">
                    Recover
                  </button>
                </Link>
              </div>
            </div>
          </form>

          <div className="text-center py-4">
            <span className="text-gray-500">
              Can't get OTP?
              <button onClick={resendOTP} className="text-red-500">
                Resend
              </button>
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
