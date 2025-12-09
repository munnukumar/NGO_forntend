import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { clearCredentials } from "../store/reducers/authReducer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Get user from Redux store
  const storeUser = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(clearCredentials());
    navigate("/login");
  };

  return (
    <nav className="w-full bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-indigo-600 hover:text-indigo-700 transition">
          NGO Crowdfund
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-indigo-600 text-sm transition"
          >
            Dashboard
          </Link>

          {/* Admin-only link */}
          {storeUser?.role === "ADMIN" && (
            <Link
              to="/admin/create-plan"
              className="text-gray-700 hover:text-indigo-600 text-sm transition"
            >
              Create Plan
            </Link>
          )}

          {/* User Actions */}
          {storeUser ? (
            <div className="flex items-center gap-3">
              <span className="text-gray-700 text-sm hidden sm:inline">
                Hi, {storeUser.email}
              </span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
