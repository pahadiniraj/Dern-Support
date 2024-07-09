import React, { useState } from "react";
import { Form, Formik } from "formik";
import CustomInput from "../CustomValidation/CustomInput";
import { signupSchema } from "../../Schema";
import { CustomSelect } from "../CustomValidation/CustomSelect";
import { CustomEmail } from "../CustomValidation/CustomEmail";
import { CustomPassword } from "../CustomValidation/CustomPassword";
import { CustomConfirmPassword } from "../CustomValidation/CustomConfirmPassword";
import { CustomAccepted } from "../CustomValidation/CustomAccepted";
import { NavLink } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import http from "../../Utils/Instance";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
  const onSubmit = async (value, action) => {
    await new Promise((resolve, reject) => {
      resolve();
    });

    console.log(value);
    sendApi(value);
  };
  const nav = useNavigate();

  const [visible, setVisible] = useState(false);
  const [visible1, setVisible1] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const sendApi = async (value, actions) => {
    try {
      setIsLoading(true);
      const res = await http.post("/auth/signup", value);
      console.log(res);
      const { accessToken } = res.data;
      localStorage.setItem("token", accessToken);
      toast("Login success");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);

      nav("/signin");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-200 ">
      {isLoading ? (
        <ClipLoader
          loading={isLoading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Formik
          initialValues={{
            fullname: "",
            email: "",
            password: "",
            confirmPassword: "",
            type: "",
            accepted: false,
          }}
          validationSchema={signupSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col text-center  w-1/3 bg-white  gap-3 p-5  rounded-2xl shadow-lg m-10">
              <h3 className=" font-bold text-2xl">Sign Up</h3>
              <p className=" text-xs">let's get started with a signup</p>
              <CustomInput
                label=""
                name="fullname"
                type="text"
                placeholder="Enter your name"
              />
              <CustomEmail
                label=""
                name="email"
                type="email"
                placeholder="Enter your email"
              ></CustomEmail>
              <CustomPassword
                label=""
                name="password"
                type={visible ? "text" : "password"}
                placeholder="Enter your password"
                visible={visible}
                setVisible={setVisible}
              ></CustomPassword>
              <CustomConfirmPassword
                label=""
                name="confirmPassword"
                type={visible1 ? "text" : "password"}
                placeholder="Confirm your password"
                visible1={visible1}
                setVisible1={setVisible1}
              ></CustomConfirmPassword>

              <CustomSelect
                label=""
                name="type"
                placeholder="Select your Option"
              >
                <option value="">Select your Option</option>
                <option value="Individual">Individual</option>
                <option value="Business">Business</option>
              </CustomSelect>
              <CustomAccepted
                label="Do you Confirm ?"
                name="accepted"
                type="checkbox"
              ></CustomAccepted>

              <button
                type="submit"
                className={`w-full bg-blue-800 text-white p-1 rounded-md  ${
                  isSubmitting ? "bg-blue-200" : ""
                }`}
              >
                Submit
              </button>
              <p>
                Already have a account{" "}
                <span className="text-blue-700 font-semibold">
                  <NavLink to="/signin">Signin</NavLink>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SignUp;
