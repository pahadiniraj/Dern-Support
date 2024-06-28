import React from "react";

const RepairDashboard = ({ repairs }) => {
  return (
    <div className="px-14 py-10 ">
      <div className="w-full bg-white flex gap-2 flex-col shadow-2xl p-5 rounded-md ">
        <div className=" font-bold text-lg">Bookings Details</div>
        {repairs.map((value, index) => (
          <div
            key={index}
            className="w-full flex text-xs justify-between bg-gray-100 p-4 items-center rounded-md"
          >
            <div className="w-1/6 text-center font-semibold">
              {value.user?.fullname}
            </div>
            <div className="w-1/6 text-center">{value.user?.email}</div>
            <div className="w-1/6 text-center">{value.user?.userType}</div>
            <div className="w-1/6 text-center">{value.scheduleAt}</div>
            <div
              className={`p-1 rounded-md text-white text-center ${
                value.status === "COMPLETED"
                  ? "bg-green-500"
                  : "" || value.status === "IN_PROGRESS"
                  ? "bg-blue-500"
                  : "" || value.status === "SCHEDULED"
                  ? "bg-yellow-500"
                  : ""
              }
              `}
            >
              {value.status}
            </div>
            <div className="w-1/6 text-center">{value.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepairDashboard;
