import React from "react";
import { useAddPaymentAccountMutation } from "../services/api";

export default function AddPaymentAccount() {
  const [add, { isLoading }] = useAddPaymentAccountMutation();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const fd = new FormData(e.target as HTMLFormElement);
    const type = fd.get("type");
    const masked = fd.get("masked");
    try {
      await add({ type, provider: "manual", masked }).unwrap();
      alert("Payment account added");
    } catch {
      alert("Failed to add payment account");
    }
  };

  return (
    <form onSubmit={submit} className="max-w-md mx-auto card">
      <h3 className="text-lg font-semibold mb-3">Add Payment Account</h3>
      <select name="type" className="w-full p-2 border rounded mb-3">
        <option value="CARD">Card</option>
        <option value="BANK">Bank</option>
      </select>

      <input name="masked" placeholder="XXXX-XXXX-XXXX-1234" className="w-full p-2 border rounded mb-3" />
      <button className="btn btn-primary w-full" disabled={isLoading}>{isLoading ? "Saving..." : "Save"}</button>
    </form>
  );
}
