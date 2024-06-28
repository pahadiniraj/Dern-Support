import React from "react";
import { useState } from "react";
import { Formik, Form } from "formik";
import { createSchema } from "../../Schema";
import CustomInput from "../CustomValidation/CustomInput";
import { CustomAccepted } from "../CustomValidation/CustomAccepted";
import http from "../../Utils/Instance";
import { ClipLoader } from "react-spinners";
import { IoClose } from "react-icons/io5";

const Create = ({ onClick, onAddSparePart }) => {
  const [isLoading, setIsLoading] = useState(false);

  const sendApi = async (value) => {
    try {
      setIsLoading(true);
      const res = await http.post("/spareparts", value);
      console.log(res);
      onAddSparePart(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
      onClick(false);
    }
  };

  const onSubmit = async (value, actions) => {
    console.log(value);
    await sendApi(value);
  };

  const handleClose = () => {
    onClick(false);
  };

  return (
    <div className="w-full p-4 flex justify-center h-full items-center fixed  inset-0  bg-opacity-40 bg-black z-10 backdrop-blur-sm ">
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
            name: "",
            price: 0,
            quantity: 0,
            weight: 0,
            inStock: true,
          }}
          validationSchema={createSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="w-1/4 flex flex-col gap-2 justify-center items-center bg-white shadow-black shadow-lg p-5 rounded-md relative ">
              <button
                className="absolute right-1 top-1 text-2xl"
                onClick={handleClose}
              >
                <IoClose />
              </button>

              <h3 className="text-2xl font-bold">Create Spare-Parts</h3>

              <CustomInput
                label="Part-Name "
                name="name"
                type="text"
                placeholder="Name"
                className="    "
              />
              <CustomInput
                label="Price (in Dollars)"
                name="price"
                type="number"
                placeholder="Price"
                className="    "
              />
              <CustomInput
                label="Quantity "
                name="quantity"
                type="number"
                placeholder="Price"
                className="    "
              />
              <CustomInput
                label="Weight (in grams)"
                name="weight"
                type="number"
                placeholder="Price"
                className="    "
              />
              <CustomAccepted
                label="This product is in stock"
                name="inStock"
                type="checkbox"
                className=" w-full text-sm flex gap-2 items-center   "
              />

              <button
                type="submit"
                className={`w-full bg-green-600 text-white p-1 rounded-md  ${
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

export default Create;
