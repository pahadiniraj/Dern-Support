import React from "react";
import { useField } from "formik";

const CustomtextArea = ({ className, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      {" "}
      <label>{label}</label>
      <div className="flex justify-start flex-col w-full text-start  ">
        <textarea
          {...field}
          {...props}
          className={`${
            meta.touched && meta.error
              ? " outline-red-600"
              : "outline-green-600"
          }  rounded-md p-1 border-gray-500 border w-full ${className}  `}
        ></textarea>
        {meta.touched && meta.error && (
          <div className="text-red-600  text-xs">{meta.error}</div>
        )}
      </div>
    </div>
  );
};

export default CustomtextArea;
