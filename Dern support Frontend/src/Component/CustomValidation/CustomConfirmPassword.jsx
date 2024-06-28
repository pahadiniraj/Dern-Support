import { useField } from "formik";
import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

export const CustomConfirmPassword = ({
  label,
  visible1,
  setVisible1,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label>{label}</label>
      <div className="flex justify-start flex-col w-full text-start">
        <div
          className={`border flex border-solid rounded-md border-gray-600 ${
            meta.error && meta.touched && "border-red-600"
          }`}
        >
          <input
            {...field}
            {...props}
            className={`${
              meta.touched && meta.error
                ? " outline-red-600"
                : "outline-green-600"
            } w-full rounded-md p-1  focus:outline-none`}
          />
          <button type="button" onClick={() => setVisible1(!visible1)}>
            {visible1 ? (
              <FaRegEye className="mr-2 text-lg" />
            ) : (
              <FaEyeSlash className="mr-2 text-lg" />
            )}
          </button>
        </div>
        {meta.touched && meta.error && (
          <div className="text-red-600 mt-1 text-xs">{meta.error}</div>
        )}
      </div>
    </>
  );
};
