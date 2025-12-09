import React, { useState } from "react";
import {
  useMeQuery,
  useListPlansQuery,
  useListOfDonationUserQuery,
  useListOfDonationByUserIdQuery, // New API to fetch single user donations
} from "../services/api";
import AddPaymentAccount from "../components/AddPaymentAccount";
import PlanCard from "../components/PlanCard";
import type { Plan } from "../components/PlanCard";

interface Donation {
  plan: string;
  amount: number;
  status: string;
}

interface DonationUser {
  _id: string;
  name: string;
  email: string;
  totalDonation: number;
  donations: Donation[];
}

interface DonationApiResponse {
  data: DonationUser[] | DonationUser; // can be array (admin) or single object (user)
  success: boolean;
}

export default function DashboardPage() {
  const { data: me, isLoading: meLoading, isError: meError } = useMeQuery(undefined);

  const { data: plansResponse, isLoading: plansLoading, isError: plansError } =
    useListPlansQuery(undefined);
  const plans: Plan[] = plansResponse?.data || [];

  const role = localStorage.getItem("role");
  const isAdmin = role === "ADMIN";

  // Admin: fetch all donation users
  const { data: donationResponse, isLoading: donationsLoading, isError: donationsError } =
    useListOfDonationUserQuery(undefined, { skip: !isAdmin });

  // Non-admin: fetch only their donations
  const {
    data: userDonationResponse,
    isLoading: userDonationsLoading,
    isError: userDonationsError,
  } = useListOfDonationByUserIdQuery(me?.data._id, { skip: isAdmin || !me?.data._id });

  // Normalize donationUsers to always be an array
  let donationUsers: DonationUser[] = [];
  if (isAdmin) {
    donationUsers = (donationResponse as DonationApiResponse | undefined)?.data as DonationUser[] || [];
  } else if (userDonationResponse) {
    const userData = (userDonationResponse as DonationApiResponse).data as DonationUser;
    donationUsers = userData ? [userData] : [];
  }

  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  if (meLoading) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-gray-500">
        Loading user info...
      </div>
    );
  }
  if (meError) {
    return (
      <div className="max-w-6xl mx-auto p-4 text-center text-red-500">
        Error loading user info.
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome, {me?.data.name ?? "User"}
            </h2>
            <p className="text-gray-600 mt-1">Your role: {me?.data.role ?? "N/A"}</p>
          </div>

          {/* Plans section */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">Available Plans</h3>
            {plansLoading && <div className="text-gray-500">Loading plans...</div>}
            {plansError && <div className="text-red-500">Error loading plans</div>}
            {!plansLoading && !plansError && plans.length === 0 && (
              <div className="text-gray-500">No plans available</div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {plans.map((plan) => (
                <PlanCard key={plan._id} plan={plan} />
              ))}
            </div>
          </div>

          {/* Donations */}
          <div className="bg-white shadow-lg rounded-xl p-6">
            <h3 className="text-xl font-semibold mb-4 text-gray-800">
              {isAdmin ? "Donation Users" : "Your Donations"}
            </h3>

            {(isAdmin ? donationsLoading : userDonationsLoading) && (
              <div className="text-gray-500">Loading donations...</div>
            )}
            {(isAdmin ? donationsError : userDonationsError) && (
              <div className="text-red-500">Error loading donations</div>
            )}
            {!donationUsers.length && (
              <div className="text-gray-500">
                {isAdmin ? "No donation users found" : "You have no donations"}
              </div>
            )}

            <ul className="space-y-3">
              {donationUsers.map((user) => {
                const isExpanded = user._id === expandedUserId;
                return (
                  <li
                    key={user._id}
                    className="border rounded-lg shadow-sm bg-gray-50 overflow-hidden transition hover:shadow-md"
                  >
                    <div
                      className="p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
                      onClick={() =>
                        setExpandedUserId(isExpanded ? null : user._id)
                      }
                    >
                      <div className="font-medium text-gray-800">
                        {user.name} — {user.email}
                      </div>
                      <div className="font-semibold text-gray-700">
                        ${(user.totalDonation / 100).toFixed(2)}
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="p-4 border-t bg-white">
                        <h4 className="font-semibold mb-2 text-gray-700">Donations:</h4>
                        <ul className="space-y-1">
                          {user.donations.map((d, idx) => (
                            <li
                              key={`${user._id}-donation-${idx}-${d.plan}-${d.amount}`}
                              className="flex justify-between border-b pb-1 text-gray-600 text-sm"
                            >
                              <span>{d.plan}</span>
                              <span>${(d.amount / 100).toFixed(2)}</span>
                              <span className="italic">({d.status})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Sidebar for non-admin */}
        {!isAdmin && (
          <div className="bg-white shadow-lg rounded-xl p-6">
            <AddPaymentAccount />
          </div>
        )}
      </div>
    </div>
  );
}
