import React from "react";
import { useParams } from "react-router-dom";
import {
  useGetPlanQuery,
  useMeQuery,
  useSubscribeMutation,
} from "../services/api";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   "pk_test_51SdTJE0eANcMj95t3vMmErKjP5prMMq7wetalcNo97GNEreK4POQ80ne6QpArEJpsRws2HgacXl2nIJYbEVueiIb00eerp34u3"
// ); // <-- Your Stripe publishable key

export default function DonatePage() {
  const { planId } = useParams<{ planId: string }>();
  const { data: planResponse, isLoading } = useGetPlanQuery(planId!);
  const { data: meResponse } = useMeQuery(undefined);
  const [subscribeMutation, { isLoading: isSubscribing }] =
    useSubscribeMutation();

  const plan = planResponse?.data;
  const userId = meResponse?.data?._id;

  if (isLoading) return <div className="p-8">Loading...</div>;
  if (!plan || !planId) return <div className="p-8">Plan not found</div>;
  if (!userId) return <div className="p-8">User not logged in</div>;
const handleSubscribeClick = async () => {
  try {
    // Call backend to create Stripe Checkout Session
    const res = await subscribeMutation({
      planId,
      amountCents: plan.amountCents,
    }).unwrap();

    console.log("response:", res);

    // ✅ Backend MUST return session.url
    const checkoutUrl =
      res?.data?.checkoutSession?.url ||
      res?.checkoutSession?.url ||
      res?.url;

    if (!checkoutUrl) {
      throw new Error("No Stripe checkout URL returned from backend");
    }

    // ✅ Redirect using browser (Stripe 2025+)
    window.location.href = checkoutUrl;
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Donation failed";
    console.error(err);
    alert(message);
  }
};


  return (
    <div className="max-w-3xl mx-auto mt-6 p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-3">Donate to {plan.title}</h2>

      <p className="mb-2 text-gray-700">
        Amount: <strong>${(plan.amountCents / 100).toFixed(2)}</strong> (
        {plan.interval})
      </p>

      <p className="mb-4 text-gray-700">
        Raised: ${(plan.raisedCents / 100).toFixed(2)} / Goal: $
        {(plan.goalCents ? plan.goalCents / 100 : 0).toFixed(2)}
      </p>

      <button
        onClick={handleSubscribeClick}
        disabled={isSubscribing}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md transition font-medium disabled:opacity-50"
      >
        {isSubscribing ? "Processing..." : "subscribe"}
      </button>
    </div>
  );
}

