import { useField } from "formik";
import React from "react";

export const CustomAccepted = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <div className={`${className} `}>
        <input
          {...field}
          {...props}
          className={`${
            meta.touched && meta.error
              ? " outline-red-600"
              : "outline-green-600"
          }   `}
        />
        <label>{label}</label>

        <div>
          {meta.touched && meta.error && (
            <div className="text-red-600  text-xs">{meta.error}</div>
          )}
        </div>
      </div>
    </>
  );
};
