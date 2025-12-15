import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DonationCancel = () => {
  const navigate = useNavigate();

  // Optional: auto-redirect after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
        
        {/* Cancel / Error Icon */}
        <svg
          className="w-16 h-16 text-red-500 mx-auto mb-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Donation Canceled
        </h2>

        <p className="text-gray-600 mb-6">
          Your donation was not completed. You can try again later or contact support if you think this was an error.
        </p>

        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-lg transition"
          >
            Go Back to Home
          </button>

          <p className="text-sm text-gray-400">
            You’ll be redirected automatically in a few seconds…
          </p>
        </div>
      </div>
    </div>
  );
};

export default DonationCancel;
