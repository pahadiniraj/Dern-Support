import { Form, Formik } from "formik";
import React, { useState } from "react";
import { signinSchema } from "../../Schema";
import { CustomEmail } from "../CustomValidation/CustomEmail";
import { CustomPassword } from "../CustomValidation/CustomPassword";
import { NavLink, useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import http from "../../Utils/Instance";

const SignIn = () => {
  const [visible, setVisible] = useState(false);
  const nav = useNavigate();
  const [isloading, setLoading] = useState(false);

  const onSubmit = async (value, action) => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
      }, 1000);
      sendApi(value);
    });
  };

  const sendApi = async (value) => {
    try {
      setLoading(true);
      const res = await http.post("/auth/signin", value);
      console.log(res);
      const { accessToken } = res.data;
      localStorage.setItem("accessToken", accessToken);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      nav("/");
    }
  };

  return (
    <div className="h-screen flex justify-center items-center bg-slate-200  ">
      {isloading ? (
        <ClipLoader
          loading={isloading}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      ) : (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={signinSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col text-center  w-1/4 bg-white  gap-3 p-5  rounded-2xl shadow-lg ">
              <h3 className=" font-bold text-2xl">Sign In</h3>

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
                setVisible={setVisible}
                visible={visible}
              />
              <p className="text-blue-700 font-medium ">Forget Password ?</p>
              <button
                type="submit"
                className={`bg-blue-700 text-white p-1 rounded-lg ${
                  isSubmitting ? "bg-blue-200" : ""
                }`}
              >
                Submit
              </button>
              <p>
                Don't have account?{" "}
                <span className="text-blue-700 font-medium">
                  <NavLink to="/signup">Signup</NavLink>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SignIn;
