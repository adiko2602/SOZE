import DashboardCards from "@/components/dashboard/Cards";
import React from "react";

function Dashboard() {
  return (
    <div className="p-2 flex justify-center">
      <div className="max-w-5xl w-full">
        <div className="grid base:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
          <DashboardCards />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
