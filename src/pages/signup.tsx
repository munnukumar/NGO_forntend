import React, { Suspense } from "react";

import SignupForm from "../components/SignupForm";
// import Navbar from "../components/Navbar";

export default function SignupPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
       <SignupForm />
    </Suspense>
  );
}

