import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const LoginSignup = () => {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setAuthError("");
    const result = await login(email, password);
    if (result.success) {
      navigate("/");
    } else {
      setAuthError(result.error || "Login failed");
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match!");
      return;
    }
    setAuthError("");
    const result = await register(name, email, password);
    if (result.success) {
      setActiveTab("login");
    } else {
      setAuthError(result.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-linear-to-b from-black via-gray-900 to-[#8b8bc7] relative">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-linear-to-r from-purple-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-linear-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Main Card */}
      <div className="w-full max-w-md relative z-10 bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl p-10 space-y-6 border border-white/50">
        {/* Toggle Tabs */}
        <div className="flex bg-linear-to-r from-gray-100 to-gray-200 rounded-2xl p-1 shadow-inner">
          <button
            onClick={() => setActiveTab("login")}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 transform ${
              activeTab === "login"
                ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "text-gray-700 hover:bg-white hover:scale-105 hover:shadow-md"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setActiveTab("signup")}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-300 transform ${
              activeTab === "signup"
                ? "bg-linear-to-r from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/25 scale-105"
                : "text-gray-700 hover:bg-white hover:scale-105 hover:shadow-md"
            }`}
          >
            Signup
          </button>
        </div>

        {/* Form Content with Transition */}
        <div className="space-y-6">
          {activeTab === "login" ? (
            // Login Form
            <>
              <h2 className="text-3xl font-bold text-center text-gray-900">
                Login Form
              </h2>
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                  {authError}
                </div>
              )}
              <form onSubmit={handleLoginSubmit} className="space-y-5">
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 px-6 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg"
                >
                  Login
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 pt-2">
                Not a member?{" "}
                <button
                  onClick={() => setActiveTab("signup")}
                  className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer hover:underline transition-all duration-200"
                >
                  Signup now
                </button>
              </p>
            </>
          ) : (
            // Signup Form
            <>
              <h2 className="text-3xl font-bold text-center text-gray-900">
                Signup Form
              </h2>
              {authError && (
                <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-xl">
                  {authError}
                </div>
              )}
              <form onSubmit={handleSignupSubmit} className="space-y-5">
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name"
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                    className="w-full px-5 py-4 border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-blue-500/30 focus:border-blue-400 shadow-sm transition-all duration-300 text-lg placeholder-gray-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-5 px-6 bg-linear-to-r from-blue-500 via-blue-600 to-blue-700 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:from-blue-600 hover:via-blue-700 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg"
                >
                  Signup
                </button>
              </form>
              <p className="text-center text-sm text-gray-600 pt-2">
                Already have an account?{" "}
                <button
                  onClick={() => setActiveTab("login")}
                  className="font-semibold text-blue-600 hover:text-blue-700 cursor-pointer hover:underline transition-all duration-200"
                >
                  Login
                </button>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;
