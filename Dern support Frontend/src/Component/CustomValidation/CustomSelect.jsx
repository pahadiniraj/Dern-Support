import { useField } from "formik";
import React from "react";

export const CustomSelect = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label>{label}</label>
      <div className="flex justify-start flex-col w-full text-start">
        <select
          {...field}
          {...props}
          className={`${
            meta.touched && meta.error
              ? " outline-red-600"
              : "outline-green-600"
          } w-full rounded-md p-1 border-gray-500 border ${className}`}
        />
        {meta.touched && meta.error && (
          <div className="text-red-600  text-xs">{meta.error}</div>
        )}
      </div>
    </>
  );
};
