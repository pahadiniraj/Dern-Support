import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const SupportDashboard = ({ supportRequest, spareParts }) => {
  const data = spareParts.map((part) => ({
    name: part.name,
    value: part.quantity,
    stock: part.inStock,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full px-14 flex justify-between gap-8">
      <div className="w-2/4 p-2 shadow-2xl border bg-white rounded-md">
        <p className="mb-3 font-bold text-lg">Support-Request</p>
        {supportRequest.map((value, index) => (
          <div
            className="flex justify-between border-b border-black p-2"
            key={index}
          >
            <div className="flex gap-1 flex-col w-2/4">
              <p className="font-semibold">{value.user.fullname}</p>
              <p className="text-sm font-light">{value.user.email}</p>
              <p className="text-xs font-semibold">{value.user.userType}</p>
            </div>
            <div className="w-2/4">
              <p className="w-full">{value.issue}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-2/4 bg-white rounded-md flex flex-col items-center">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart width={100} height={100}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className=" w-full px-10">
          {data.map((entry, index) => (
            <div key={index} className="flex items-center mb-2 gap-4 ">
              <div
                style={{
                  width: 20,
                  height: 20,
                  backgroundColor: COLORS[index % COLORS.length],
                }}
                className=" flex items-center"
              />
              <div className=" font-medium">
                {entry.name}:{" "}
                {(
                  (entry.value /
                    data.reduce((sum, item) => sum + item.value, 0)) *
                  100
                ).toFixed(2)}
                %
              </div>
              <div>
                {entry.stock ? (
                  <p className="text-white rounded-2xl p-2 text-xs bg-green-500">
                    In-stock
                  </p>
                ) : (
                  <p
                    className="
                  text-white rounded-2xl p-2 text-xs bg-red-500
                  "
                  >
                    Out-Stock
                  </p>
                )}
              </div>
              <div>
                <p className="bg-gray-700 text-white p-1 text-xs rounded-md">
                  {entry.value} Products
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportDashboard;
