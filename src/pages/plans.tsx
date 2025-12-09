import React from "react";
import PlansList from "../components/PlanList";
import Navbar from "../components/Navbar";

export default function PlansPage() {
  return (
    <>
      <Navbar />
      <div className="py-6">
        <h1 className="max-w-5xl mx-auto px-4 text-2xl font-semibold">Projects</h1>
        <PlansList />
      </div>
    </>
  );
}
