import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const LogOutNotification = ({ handlePop, text, handleDelete }) => {
  return (
    <div className="fixed  inset-0  bg-opacity-40 bg-black z-10 backdrop-blur-sm  justify-center flex items-center ">
      <div className=" bg-white p-2  rounded-md  gap-4 relative">
        <p className="p-5">Are you sure you want to {text} ?</p>
        <div className=" flex gap-20 justify-center">
          <div>
            <button
              onClick={handleDelete}
              className="bg-green-600 text-white p-2  rounded-lg"
            >
              Confirm
            </button>
          </div>
          <div>
            <button
              onClick={handlePop}
              className="bg-red-600 text-white p-2 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogOutNotification;
