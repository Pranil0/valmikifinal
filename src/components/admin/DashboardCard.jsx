import React from "react";

const DashboardCard = ({ title, value, color }) => {
  return (
    <div className={`p-6 rounded-lg shadow-md text-white ${color} flex flex-col justify-center items-center`}>
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-3xl mt-2 font-bold">{value}</p>
    </div>
  );
};

export default DashboardCard;