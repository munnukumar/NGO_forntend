import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const DonationSuccess = () => {
  const navigate = useNavigate();

  // Auto redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        
        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Donation Successful 🎉
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your generous contribution. Your support truly makes a difference.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
          >
            Go to Dashboard
          </button>

          <p className="text-sm text-gray-400">
            You’ll be redirected automatically in a few seconds…
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationSuccess;
