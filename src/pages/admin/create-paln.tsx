import React from "react";
// import Navbar from "../../components/Navbar";
import { useCreatePlanMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePlanPage() {
  const [create, { isLoading }] = useCreatePlanMutation();
  const nav = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const title = fd.get("title");
    const description = fd.get("description");
    const amount = Math.round(Number(fd.get("amount")) * 100);
    const interval = fd.get("interval");
    const goal = fd.get("goal") ? Math.round(Number(fd.get("goal")) * 100) : 0;
    try {
      await create({ title, description, amountCents: amount, interval, goalCents: goal }).unwrap();
      alert("Plan created");
      nav("/dashboard");
    } catch (err) {
      alert("Failed creating plan");
      console.error(err);
    }
  };

  return (
    <>
      {/* <Navbar /> */}
      <div className="max-w-2xl mx-auto p-4">
        <form onSubmit={submit} className="card">
          <h2 className="text-xl font-semibold mb-3">Create Plan</h2>
          <input name="title" placeholder="Title" className="w-full p-2 mb-2 border rounded" />
          <textarea name="description" placeholder="Description" className="w-full p-2 mb-2 border rounded" />
          <input name="amount" placeholder="Amount (USD)" className="w-full p-2 mb-2 border rounded" />
          <select name="interval" className="w-full p-2 mb-2 border rounded">
            <option value="MONTH">$ / month</option>
            <option value="QUARTER">$ / quarter</option>
            <option value="HALF_YEAR">$ / half year</option>
            <option value="YEAR">$ / year</option>
            <option value="ONE_TIME">One-time</option>
          </select>
          <input name="goal" placeholder="Goal (USD, optional)" className="w-full p-2 mb-2 border rounded" />
          <button className="btn btn-primary w-full" disabled={isLoading}>{isLoading ? "Creating..." : "Create Plan"}</button>
        </form>
      </div>
    </>
  );
}
