import React, { useState } from "react";
import { Mail, ArrowLeft, Lock, Key } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { API_ENDPOINTS } from "../lib/api.js";

function ForgetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1); // 1: email, 2: OTP, 3: new password
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.forgetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message);
        setStep(2); // Move to OTP step
      } else {
        setError(data.message || "Failed to send OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check if the backend server is running.");
      console.error("Send OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.verifyOtp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message);
        setStep(3); // Move to password reset step
      } else {
        setError(data.message || "Invalid OTP. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Verify OTP error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long!");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(API_ENDPOINTS.resetPassword, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSuccess(data.message);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setError(data.message || "Failed to reset password. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-200 p-4 relative">
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
          <h1 className="text-xl font-bold">Forget Password</h1>
          <p className="text-sm text-gray-600 mt-1">
            {step === 1 && "Enter your email to receive OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Enter your new password"}
          </p>
        </div>

        {/* Form Section */}
        <div className="p-6 flex flex-col gap-4">
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-green-100 border-2 border-green-500 text-green-700 px-4 py-2 rounded-md text-sm">
              {success}
            </div>
          )}

          {/* Step 1: Email Input */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
              <div className="flex items-center border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black]">
                <span className="p-2 border-r-2 border-black">
                  <Mail size={20} />
                </span>
                <input aria-label="Enter your Email"
                  type="email"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 p-2 outline-none border-none"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </form>
          )}

          {/* Step 2: OTP Input */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="flex flex-col gap-4">
              <div className="flex items-center border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black]">
                <span className="p-2 border-r-2 border-black">
                  <Key size={20} />
                </span>
                <input aria-label="Enter OTP"
                  type="text"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                  required
                  maxLength={4}
                  className="flex-1 p-2 outline-none border-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Verifying..." : "Verify OTP"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="flex flex-col gap-4">
              <div className="flex items-center border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black]">
                <span className="p-2 border-r-2 border-black">
                  <Lock size={20} />
                </span>
                <input aria-label="New Password"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  minLength={6}
                  className="flex-1 p-2 outline-none border-none"
                />
              </div>

              <div className="flex items-center border-2 border-black rounded-md bg-white shadow-[4px_4px_0px_black]">
                <span className="p-2 border-r-2 border-black">
                  <Lock size={20} />
                </span>
                <input aria-label="Confirm Password"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={6}
                  className="flex-1 p-2 outline-none border-none"
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex-1 bg-gray-400 hover:bg-gray-500 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200"
                >
                  Back
                </button>
              </div>
            </form>
          )}

          {/* Back to Login */}
          <Link
            to={"/login"}
            className="flex flex-1 justify-center items-center w-full bg-white hover:bg-gray-100 border-2 border-black shadow-[4px_4px_0px_black] rounded-md p-2 font-semibold cursor-pointer transform hover:scale-105 transition duration-200"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
