import React, { useState } from "react";
import { Mail, ArrowLeft, Lock } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../lib/api.js";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Store token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        // Redirect to dashboard
        navigate("/dashboard");
      } else {
        setError(data.message || "Login failed. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check if the backend server is running.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 relative"
      style={{ backgroundColor: "#4ade80" }}
    >
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 left-4 flex items-center gap-1 border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black] px-3 py-2 font-semibold cursor-pointer hover:bg-gray-100 transform hover:scale-105 transition duration-200"
      >
        <ArrowLeft size={18} />
        <span>Back</span>
      </button>

      <div className="bg-white rounded-md border-2 border-black max-w-sm w-full shadow-[6px_6px_0px_black]">
        {/* Header */}
        <div className="border-b-2 border-black p-3 text-center">
          <h1 className="text-xl font-bold">Login</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div className="flex items-center border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black]">
            <span className="p-2 border-r-2 border-black">
              <Mail size={20} />
            </span>
            <input aria-label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 p-2 outline-none border-none"
            />
          </div>

          {/* Password */}
          <div className="flex items-center border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black]">
            <span className="p-2 border-r-2 border-black">
              <Lock size={20} />
            </span>
            <input aria-label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="flex-1 p-2 outline-none border-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex flex-1 justify-center items-center bg-emerald-400 hover:bg-emerald-500 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Navigation Buttons */}
          <div className="flex gap-4">
            <Link
              to={"/signup"}
              className="flex flex-1 justify-center items-center bg-yellow-400 hover:bg-yellow-500 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200"
            >
              Signup
            </Link>
          </div>

          {/* Extra Buttons */}
          <div className="flex gap-4">
            <Link
              to={"/forget"}
              className="flex flex-1 justify-center items-center border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200 hover:bg-gray-100"
            >
              Forget Password
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
