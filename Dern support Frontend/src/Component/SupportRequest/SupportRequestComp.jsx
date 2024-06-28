import React, { useState } from "react";
import { Formik, Form } from "formik";
import { supportrequestSchema } from "../../Schema";
import CustomtextArea from "../CustomValidation/CustomtextArea";
import { ClipLoader } from "react-spinners";
import http from "../../Utils/Instance";

const SupportRequestComp = () => {
  const [isLoading, setIsLoading] = useState(false);

  const sendApi = async (value) => {
    try {
      setIsLoading(true);
      const res = await http.post("/supportrequest", value);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (value, actions) => {
    console.log(value);
    await sendApi(value);
  };

  return (
    <div className="w-full bg-slate-200 p-4 flex justify-center h-full items-center ">
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
            issue: "",
          }}
          validationSchema={supportrequestSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-3/4 flex flex-col gap-5 justify-center items-center bg-slate-300 shadow-black shadow-sm p-5 rounded-md ">
              <h3 className="text-3xl font-bold">Support Request</h3>
              <CustomtextArea
                label=""
                name="issue"
                type="text"
                placeholder="Enter your Problem"
                className=" w-full h-32 "
              />

              <button
                type="submit"
                className={`w-full bg-blue-800 text-white p-1 rounded-md  ${
                  isSubmitting ? "bg-blue-200" : ""
                }`}
                disabled={isSubmitting}
              >
                Submit
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default SupportRequestComp;
