import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetPlanQuery, useMeQuery, useSubscribeMutation } from "../services/api";

interface PaymentAccount {
  _id: string;
  type: string;
  provider: string;
  masked?: string;
  isDefault: boolean;
}

export default function DonatePage() {
  const { planId } = useParams<{ planId: string }>();
  const { data: planResponse } = useGetPlanQuery(planId!);
  const { data: meResponse } = useMeQuery(undefined);
  const [subscribe] = useSubscribeMutation();
  const [showAccounts, setShowAccounts] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const nav = useNavigate();

  // Handle plan
  const plan = planResponse?.data;
  if (!plan) return <div className="p-8">Plan not found</div>;

  // Handle user
  const paymentAccounts: PaymentAccount[] = meResponse?.data?.paymentAccounts || [];

  const handleSubscribeClick = () => {
    if (!paymentAccounts.length) {
      alert("No payment accounts found. Please add one first.");
      return;
    }
    setShowAccounts(true);
  };

  const handleAccountSelect = async (accountId: string) => {
    setSelectedAccountId(accountId);

    try {
      await subscribe({ planId: planId!, paymentAccountId: accountId }).unwrap();
      alert("Subscribed! Donation will be scheduled.");
      nav("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to subscribe");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-6 p-4 bg-white shadow rounded-lg">
      <h2 className="text-xl font-semibold mb-2">Donate to {plan.title}</h2>
      <p className="mb-2">
        Amount: ${(plan.amountCents / 100).toFixed(2)} ({plan.interval})
      </p>
      <p className="mb-4">
        Raised: ${(plan.raisedCents / 100).toFixed(2)} / Goal: $
        {(plan.goalCents ? plan.goalCents / 100 : 0).toFixed(2)}
      </p>

      {!showAccounts && (
        <button
          onClick={handleSubscribeClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Subscribe
        </button>
      )}

      {showAccounts && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Select a Payment Account</h3>
          <div className="space-y-2">
            {paymentAccounts.map((acc: PaymentAccount) => (
              <div
                key={acc._id}
                onClick={() => handleAccountSelect(acc._id)}
                className={`p-3 border rounded cursor-pointer transition ${
                  selectedAccountId === acc._id
                    ? "border-blue-600 bg-blue-50"
                    : "border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span>{acc.masked || acc.type}</span>
                  {acc.isDefault && (
                    <span className="text-xs text-gray-500">(Default)</span>
                  )}
                </div>
                <div className="text-xs text-gray-400">{acc.provider}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
