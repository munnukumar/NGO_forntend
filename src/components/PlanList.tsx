import React from "react";
import { useListPlansQuery } from "../services/api";
import PlanCard from "./PlanCard";

// Must match what PlanCard expects
interface Plan {
  _id: string;
  title: string;
  description?: string;
  amountCents: number;
  goalCents?: number;
  raisedCents: number;
  interval: string;
}

export default function PlansList() {
  const { data, isLoading, isError } = useListPlansQuery(undefined);

  if (isLoading) return <div className="p-8">Loading plans...</div>;
  if (isError) return <div className="p-8">Could not load plans</div>;

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
      {data?.map((p: Plan) => (
        <PlanCard key={p._id} plan={p} />
      ))}
    </div>
  );
}
