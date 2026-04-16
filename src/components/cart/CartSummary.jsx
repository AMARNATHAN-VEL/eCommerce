import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const CartSummary = () => {
  const { cartCount, cartTotal } = useCart();

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 max-w-md w-full">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Cart Summary
      </h2>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between text-lg">
          <span className="text-gray-700 font-medium">Total Items:</span>
          <span className="font-bold text-gray-900">{cartCount}</span>
        </div>
        <div className="flex justify-between text-2xl">
          <span className="text-gray-900 font-semibold">Total Price:</span>
          <span className="font-bold text-indigo-600">
            ${cartTotal.toFixed(2)}
          </span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="block w-full bg-indigo-600 text-white py-4 px-6 rounded-xl text-lg font-semibold text-center hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
      >
        Go to Checkout
      </Link>
    </div>
  );
};

export default CartSummary;
