import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetPlanQuery,
  useMeQuery,
  useSubscribeMutation,
} from "../services/api";

export default function DonatePage() {
  const { planId } = useParams();
  const { data: planResponse } = useGetPlanQuery(planId!);
  const { data: me } = useMeQuery(undefined);
  const [subscribe, { isLoading }] = useSubscribeMutation();
  const navigate = useNavigate();

  const plan = planResponse?.data;

  if (!plan) return <div className="p-6 text-center">Plan not found</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accountId = me?.paymentAccounts?.[0]?._id;

    if (!accountId) {
      alert("You must add a payment account first.");
      return;
    }

    try {
      await subscribe({
        planId: planId!,
        paymentAccountId: accountId,
      }).unwrap();
      alert("Subscribed successfully!");
      navigate("/dashboard");
    } catch (error) {
      alert("Subscription failed");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-2">Donate to {plan.title}</h2>
      <p className="text-gray-700 mb-4">
        Amount: ${(plan.amountCents / 100).toFixed(2)} ({plan.interval})
      </p>

      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
}
