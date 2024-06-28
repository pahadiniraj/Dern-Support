import { useField } from "formik";
import React from "react";

export const CustomEmail = ({ label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label>{label}</label>
      <div className="flex justify-start flex-col w-full text-start">
        <input
          {...field}
          {...props}
          className={`${
            meta.touched && meta.error ? " outline-red-600" : ""
          } w-full rounded-md p-1 border-gray-500 border `}
        />
        {meta.touched && meta.error && (
          <div className="text-red-600 mt-1 text-xs">{meta.error}</div>
        )}
      </div>
    </>
  );
};
