import React from "react";

const Button = ({ text, className, onClick }) => {
  return (
    <>
      <button
        className={`${className} px-4 py-2 text-white rounded-md`}
        onClick={onClick}
      >
        {text}
      </button>
    </>
  );
};

export default Button;
