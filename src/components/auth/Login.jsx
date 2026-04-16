import React, { useState } from "react";

const Login = ({ onSwitchToSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login submit:", { email, password });
    // TODO: Auth logic here
  };

  return (
    <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 space-y-6">
      {/* Title */}
      <h2 className="text-2xl font-bold text-center text-gray-900">
        Login Form
      </h2>

      {/* Toggle Buttons */}
      <div className="flex bg-gray-100 rounded-xl p-1">
        <button className="flex-1 py-3 px-4 font-semibold text-sm rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg transform hover:scale-[1.02] transition-all duration-200 active:scale-[0.98]">
          Login
        </button>
        <button
          onClick={onSwitchToSignup}
          className="flex-1 py-3 px-4 font-semibold text-sm rounded-lg text-gray-700 bg-gray-100 hover:bg-gray-200 transition-all duration-200"
        >
          Signup
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
          />
        </div>
        <div className="space-y-2">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition-all duration-200"
          />
          <a
            href="#"
            className="text-sm text-blue-600 hover:text-blue-800 font-medium text-left block hover:underline transition-colors duration-200"
          >
            Forgot password?
          </a>
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-600">
        Not a member?{" "}
        <button
          onClick={onSwitchToSignup}
          className="font-semibold text-blue-600 hover:text-blue-800 cursor-pointer hover:underline transition-colors duration-200"
        >
          Signup now
        </button>
      </p>
    </div>
  );
};

export default Login;
