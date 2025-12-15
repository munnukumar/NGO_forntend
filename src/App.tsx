import React, { lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import BasicLayout from "./layouts/Basic";
import AuthenticatedLayout from "./layouts/Authenticated";

const Login = lazy(() => import("./pages/login"));
const Signup = lazy(() => import("./pages/signup"));
const Plans = lazy(() => import("./pages/plans"));
const Plan = lazy(() => import("./pages/plan"));
const Dashboard = lazy(() => import("./pages/dashboard"));
// const Kyc = lazy(() => import("./pages/kyc"));
const Donate = lazy(() => import("./pages/donate"));
// const AdminDashboard = lazy(() => import("./pages/admin/admin-dashboard"));
const CreatePlan = lazy(() => import("./pages/admin/create-paln"));
import DonationSuccess from "./pages/DonationSuccess";
import DonationCancel from "./pages/DonationCancel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public */}
        <Route element={<BasicLayout />}>
          <Route index element={<Navigate to="/plans" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:id" element={<Plan />} />
        </Route>

        {/* protected */}
        <Route element={<AuthenticatedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/donate/:planId" element={<Donate />} />
          <Route path="/donation-success" element={<DonationSuccess />} />
          <Route path="/donation-cancel" element={<DonationCancel />} />
          {/* <Route path="/kyc" element={<Kyc />} /> */}

          {/* admin */}
          {/* <Route path="/admin" element={<AdminDashboard />} /> */}
          <Route path="/admin/create-plan" element={<CreatePlan />} />
        </Route>

        <Route path="*" element={<div className="p-8">Page not found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
