import React from "react";
import { useParams } from "react-router-dom";
import { useGetPlanQuery } from "../services/api";

export default function ViewPlanPage() {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetPlanQuery(id!);

  if (isLoading) return <div className="p-6 text-center">Loading plan...</div>;
  if (isError || !data) return <div className="p-6 text-center text-red-500">Plan not found</div>;

  const plan = data.data;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold">{plan.title}</h2>
      <p className="mt-2 text-gray-700">{plan.description}</p>

      <div className="mt-4 text-lg">
        Amount: ${(plan.amountCents / 100).toFixed(2)} ({plan.interval})
      </div>
      <div className="mt-2">
        Raised: ${(plan.raisedCents / 100).toFixed(2)}
        {plan.goalCents && <> / ${(plan.goalCents / 100).toFixed(2)}</>}
      </div>
    </div>
  );
}
