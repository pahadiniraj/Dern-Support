import React, { useState } from "react";
import { HiMiniInboxArrowDown } from "react-icons/hi2";
import { GoGraph } from "react-icons/go";
import { HiHomeModern } from "react-icons/hi2";
import { IoMdPersonAdd } from "react-icons/io";
import { useEffect } from "react";
import http from "../../Utils/Instance";
import SupportDashboard from "./SupportDashboard";
import RepairDashboard from "./RepairDashboard";

const DashboardComp = () => {
  const [repairs, setRepairs] = useState([]);
  const [spareParts, setSpareParts] = useState([]);
  const [supportRequest, setSupportRequest] = useState([]);
  const [users, setUsers] = useState([]);

  console.log(repairs);

  const getBookings = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await http.get("/repairs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedRepairs = [...res.data];
      setRepairs(updatedRepairs);
    } catch (error) {
      console.error("Error fetching Bookings:", error);
    }
  };
  const getSpareParts = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await http.get("/spareparts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedSpareParts = [...res.data];
      setSpareParts(updatedSpareParts);
      // console.log(res.data?.length);
    } catch (error) {
      console.error("Error fetching spare parts:", error);
    }
  };

  const getUsers = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await http.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const updatedUsers = [...res.data];
      setUsers(updatedUsers);
      // console.log(res.data?.length);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  const getSupportRequest = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await http.get(`/supportrequest`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // setSupportRequest(res.data?.length);
      const updatedSupport = [...res.data];
      setSupportRequest(updatedSupport);
    } catch (error) {
      console.error("Error fetching support request:", error);
    }
  };

  useEffect(() => {
    getBookings();
    getUsers();
    getSpareParts();
    getSupportRequest();
  }, []);

  const dash = [
    {
      name: "Booking",
      totalBookings: repairs?.length,
      icon: <HiMiniInboxArrowDown />,
      per: 55,
      className: "bg-black",
    },
    {
      name: "Users",
      totalBookings: users?.length,
      icon: <GoGraph />,
      per: 5,
      className: "bg-blue-500",
    },
    {
      name: "Spare-Parts",
      totalBookings: spareParts?.length,
      icon: <HiHomeModern />,
      per: 3,
      className: "bg-green-500",
    },
    {
      name: "Support Request",
      totalBookings: supportRequest?.length,
      icon: <IoMdPersonAdd />,
      per: 11,
      className: "bg-pink-500",
    },
  ];

  return (
    <div className="bg-slate-200 h-full">
      <div className="w-full flex gap-10 py-10 px-5 justify-center ">
        {dash.map((value, index) => (
          <div
            className=" w-1/5  bg-white rounded-md p-2 shadow-lg"
            key={index}
          >
            <div className="flex  justify-between w-full p-2">
              <div
                className={`text-2xl ${value.className} text-white flex items-center w-1/4 justify-center rounded-md relative bottom-6`}
              >
                {value.icon}
              </div>
              <div className="flex flex-col  items-end">
                <p className="text-xs text-slate-500 ">{value.name}</p>
                <p className="font-bold">{value.totalBookings}</p>
              </div>
            </div>
            <div className="text-xs ">
              <span>{value.per}%</span> then last week
            </div>
          </div>
        ))}
      </div>
      <SupportDashboard
        supportRequest={supportRequest}
        spareParts={spareParts}
      />
      <RepairDashboard repairs={repairs} />
    </div>
  );
};

export default DashboardComp;
