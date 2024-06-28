import React from "react";
import { MdSupportAgent } from "react-icons/md";
import { GiAutoRepair } from "react-icons/gi";
import { TbSettingsCheck } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Lists = () => {
  const list = [
    { name: "Dashboard", link: "dashboard", logo: <MdDashboard /> },
    {
      name: "Support Request",
      link: "supportrequest",
      logo: <MdSupportAgent />,
    },
    { name: "Repair", link: "repairs", logo: <GiAutoRepair /> },
    { name: "Spare-Parts", link: "spareparts", logo: <TbSettingsCheck /> },
  ];

  return (
    <div>
      {list.map((item, index) => (
        <div key={index}>
          <NavLink
            to={item.link}
            className={({ isActive }) =>
              isActive ? "text-green-500" : "text-white"
            }
          >
            <div
              className="w-full flex gap-2 p-2 rounded-lg items-center transition-colors duration-300"
              style={{ backgroundColor: "transparent" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "rgba(128, 128, 128, 0.2)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div className="text-2xl">{item.logo}</div>
              <div>{item.name}</div>
            </div>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default Lists;
