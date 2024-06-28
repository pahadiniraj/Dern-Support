import React from "react";
import { useState } from "react";
import { Formik, Form } from "formik";
import { repairSchema } from "../../Schema";
import CustomtextArea from "../CustomValidation/CustomtextArea";
import CustomInput from "../CustomValidation/CustomInput";
import { IoClose } from "react-icons/io5";
import http from "../../Utils/Instance";
import { ClipLoader } from "react-spinners";

const Book = ({ close, onAddRepair }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendApi = async (value) => {
    try {
      setIsLoading(true);
      const res = await http.post("/repairs", value);
      close(false);
      onAddRepair(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      close(false);
    }
  };

  const onSubmit = async (value) => {
    console.log(value);
    await sendApi(value);
  };

  return (
    <div className="fixed  inset-0  bg-opacity-40 bg-black z-10 backdrop-blur-sm  justify-center flex items-center ">
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
            description: "",
            scheduleAt: "",
          }}
          validationSchema={repairSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-2/6 flex flex-col gap-5 justify-center items-center bg-white shadow-black shadow-lg p-5 rounded-md relative ">
              <div className="absolute top-2 right-2 text-xl">
                <button onClick={close}>
                  <IoClose />
                </button>
              </div>
              <h3 className="text-3xl font-bold">Repair Request</h3>
              <CustomtextArea
                label="Address your problem"
                name="description"
                type="text"
                placeholder="Enter your Problem"
                className=" w-full h-32 "
              />
              <CustomInput
                label=""
                name="scheduleAt"
                type="datetime-local"
                placeholder="Enter your Problem"
                className=" w-full "
              />
              <button
                type="submit"
                className={`w-full bg-green-600 text-white p-1 rounded-md  ${
                  isSubmitting ? "bg-blue-200" : ""
                }`}
                disabled={isSubmitting}
              >
                Book Now
              </button>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Book;
