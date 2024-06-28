import React from "react";
import { IoIosLogOut } from "react-icons/io";

const LogOut = ({ handlePop }) => {
  return (
    <div
      className="w-full flex gap-2 p-2 rounded-lg text-white"
      style={{ backgroundColor: "transparent" }}
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = "rgba(128, 128, 128, 0.2)")
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <IoIosLogOut className="text-2xl" /> {/* Ensure icon color is solid */}
      <button onClick={handlePop} className="">
        Logout
      </button>
    </div>
  );
};

export default LogOut;
