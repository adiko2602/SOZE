import DashboardCards from "@/components/dashboard/Cards";
import React from "react";

function Dashboard() {
  return (
    <div className="grid base:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
      <DashboardCards />
    </div>
  );
}

export default Dashboard;
