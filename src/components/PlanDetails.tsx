import React, { useState } from "react";
import { useParams, Link} from "react-router-dom";
import { useGetPlanQuery} from "../services/api";
import type { Plan } from "../components/PlanCard";

// interface PaymentAccount {
//   _id: string;
//   type: string;
//   provider: string;
//   masked?: string;
//   isDefault: boolean;
// }

export default function PlanDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: planResponse, isLoading: isPlanLoading } = useGetPlanQuery(id!);
  // const { data: meResponse } = useMeQuery(undefined);
  // const [subscribe, { isLoading: isSubscribing }] = useSubscribeMutation();
  const [showAccounts] = useState(false);
//const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  //const nav = useNavigate();

  // Extract plan and user info
  const plan: Plan | undefined = planResponse?.data;
  //const paymentAccounts: PaymentAccount[] = meResponse?.data?.paymentAccounts || [];

  if (isPlanLoading)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );

  if (!plan)
    return (
      <div className="h-screen flex items-center justify-center text-gray-500">
        Plan not found
      </div>
    );

  // const handleSubscribeClick = () => {
  //   if (!paymentAccounts.length) {
  //     alert("No payment accounts found. Add one first from Dashboard.");
  //     return;
  //   }
  //   setShowAccounts(true);
  // };

  // const handleAccountSelect = async (accountId: string) => {
  //   setSelectedAccountId(accountId);

  //   try {
  //     await subscribe({ planId: plan._id, paymentAccountId: accountId }).unwrap();
  //     alert("Subscribed! Donation scheduled.");
  //     nav("/dashboard");
  //   } catch (err) {
  //     console.error(err);
  //     alert("Failed to subscribe.");
  //   }
  // };

  return (
    <div className="h-screen w-full flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-2">{plan.title}</h2>
        <p className="text-gray-700 mb-4">{plan.description}</p>

        <div className="space-y-2 text-gray-800">
          <div>
            <span className="font-semibold">Amount:</span> ${(plan.amountCents / 100).toFixed(2)} ({plan.interval})
          </div>
          <div>
            <span className="font-semibold">Raised:</span> ${(plan.raisedCents / 100).toFixed(2)}
          </div>
          <div>
            <span className="font-semibold">Goal:</span> ${plan.goalCents ? (plan.goalCents / 100).toFixed(2) : "N/A"}
          </div>
        </div>

        {!showAccounts && (
          <Link
            to={`/donate/${plan._id}`}
            className="border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-100"
          >
            Donate
          </Link>
        )}

        {/* {showAccounts && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Select a Payment Account</h3>
            <div className="space-y-2">
              {paymentAccounts.length === 0 ? (
                <p className="text-gray-500">No payment accounts available. Please add one.</p>
              ) : (
                paymentAccounts.map((acc: PaymentAccount) => (
                  <div
                    key={acc._id}
                    onClick={() => handleAccountSelect(acc._id)}
                    className={`p-3 border rounded cursor-pointer transition ${selectedAccountId === acc._id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:bg-gray-50"
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span>{acc.masked || acc.type}</span>
                      {acc.isDefault && <span className="text-xs text-gray-500">(Default)</span>}
                    </div>
                    <div className="text-xs text-gray-400">{acc.provider}</div>
                  </div>
                ))
              )}
            </div>
          </div>
        )} */}

        <div className="mt-6">
          <Link
            to="/dashboard"
            className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded-md transition"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
}
