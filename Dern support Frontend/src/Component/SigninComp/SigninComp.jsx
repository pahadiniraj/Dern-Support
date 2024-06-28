import React from "react";
import { NavLink } from "react-router-dom";

const SigninComp = () => {
  return (
    <div>
      <NavLink
        to="/signin"
        className={({ isActive }) => (isActive ? "text-blue-600  " : "")}
      >
        <li className=" rounded-md flex flex-row p-2 justify-start items-center">
          <div className="flex ">
            <svg
              className=" w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
              />
            </svg>
            <span className="flex-1 ms-3">Sign In</span>
          </div>
        </li>
      </NavLink>
    </div>
  );
};

export default SigninComp;
