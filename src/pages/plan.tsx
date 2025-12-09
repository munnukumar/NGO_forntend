import React from "react";
import PlanDetail from "../components/PlanDetails";
import Navbar from "../components/Navbar";

export default function PlanPage() {
  return (
    <>
      <Navbar />
      <div className="py-6">
        <PlanDetail />
      </div>
    </>
  );
}
