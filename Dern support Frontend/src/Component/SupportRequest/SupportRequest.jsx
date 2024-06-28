import React from "react";
import { MdSupportAgent } from "react-icons/md";
import { NavLink } from "react-router-dom";

const SupportRequest = () => {
  return (
    <div>
      <NavLink to="supportrequest">
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
          <MdSupportAgent className="text-2xl" />{" "}
          <button>Support Request</button>
        </div>
      </NavLink>
    </div>
  );
};

export default SupportRequest;
