import React from "react";
import { Outlet, Navigate } from "react-router-dom";
// import { useAppSelector } from "../hooks";
import Navbar from "../components/Navbar";

export default function AuthenticatedLayout() {
  const auth = localStorage.getItem("accessToken");
  if (!auth) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      <Navbar />
      <main className="py-6">
        <Outlet />
      </main>
    </>
  );
}
