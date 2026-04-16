import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useCart } from "../../hooks/useCart";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const capitalizeName = (name) => {
    if (!name) return "";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const { currentUser, logout } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!currentUser;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      {/* Desktop Navbar */}
      <div className="max-w-6xl mx-auto px-8 lg:px-12">
        <div className="flex justify-between items-center h-16">
          {/* Brand */}
          <Link
            to="/"
            className="ml-8 lg:ml-12 text-2xl font-bold text-gray-900 hover:text-indigo-600 transition-colors"
          >
            StyleCart
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-12 lg:space-x-16">
            <Link
              to="/"
              className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md transition-colors"
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="relative text-lg font-medium text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md transition-colors group"
            >
              Cart
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center shadow-lg">
                  {cartCount}
                </span>
              )}
            </Link>
            {/* Login / Profile */}
            {isLoggedIn ? (
              <div className="relative group" ref={dropdownRef}>
                <button
                  className="w-10 h-10 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg cursor-pointer hover:bg-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-110 focus:outline-none"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  {currentUser?.name?.[0]?.toUpperCase() || "U"}
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1 border border-gray-200 overflow-hidden">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100">
                    {capitalizeName(currentUser?.name) || "User"}
                  </div>
                  <Link
                    to="/orders"
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors block"
                  >
                    Orders
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login-signup"
                className="text-lg font-medium text-gray-700 hover:text-indigo-600 px-4 py-2 rounded-md transition-colors border border-gray-300 hover:border-indigo-600"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden mr-8 lg:mr-12 p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-50 border-t border-gray-200 pb-4">
          <div className="max-w-6xl mx-auto px-8 lg:px-12 pt-2">
            <Link
              to="/"
              className="block px-4 py-3 text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-white rounded-lg transition-all mb-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/cart"
              className="relative block px-4 py-3 text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-white rounded-lg transition-all mb-2"
              onClick={() => setIsOpen(false)}
            >
              Cart
              {cartCount > 0 && (
                <span className="ml-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {isLoggedIn ? (
              <div className="relative group" ref={dropdownRef}>
                <div
                  className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-semibold text-lg mx-auto cursor-pointer hover:bg-indigo-700 transition-all duration-200"
                  onClick={(e) => {
                    e.stopPropagation();
                    setDropdownOpen(!dropdownOpen);
                  }}
                >
                  {currentUser?.name ? currentUser.name[0].toUpperCase() : "👤"}
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 py-1 border border-gray-200 overflow-hidden">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-900 border-b border-gray-100">
                    {capitalizeName(currentUser?.name) || "User"}
                  </div>
                  <Link
                    to="/orders"
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors block"
                  >
                    Orders
                  </Link>
                  <button
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/login-signup"
                className="block w-full text-center px-4 py-3 text-lg font-medium text-gray-700 hover:text-indigo-600 hover:bg-white rounded-lg transition-all border border-gray-300"
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
