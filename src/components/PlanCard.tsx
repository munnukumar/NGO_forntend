import React from "react";
import { Link } from "react-router-dom";

export interface Plan {
  _id: string;
  title: string;
  description?: string;
  amountCents: number;
  raisedCents: number;
  goalCents?: number;
  interval: string;
}

interface PlanCardProps {
  plan: Plan;
}

export default function PlanCard({ plan }: PlanCardProps) {
  const amount = (plan.amountCents / 100).toFixed(2);
  const goal = plan.goalCents ? (plan.goalCents / 100).toFixed(2) : null;
  const raised = (plan.raisedCents / 100).toFixed(2);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{plan.title}</h3>
          <p className="text-gray-600 text-sm mt-1">{plan.description}</p>
        </div>
        <div className="text-right">
          <div className="text-xl font-bold">${amount}</div>
          <div className="text-xs text-gray-500">{plan.interval}</div>
        </div>
      </div>

      <div className="mt-3">
        <div className="text-sm">
          Raised: ${raised} {goal && <> / Goal ${goal}</>}
        </div>
        <div className="mt-2 flex gap-2">
          <Link
            to={`/plans/${plan._id}`}
            className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700"
          >
            View
          </Link>
          <Link
            to={`/donate/${plan._id}`}
            className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Donate
          </Link>
        </div>
      </div>
    </div>
  );
}
