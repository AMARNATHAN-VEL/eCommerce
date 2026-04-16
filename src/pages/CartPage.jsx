import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import Loader from "../components/common/Loader.jsx";
import CartItem from "../components/cart/CartItem.jsx";
import CartSummary from "../components/cart/CartSummary.jsx";

const CartPage = () => {
  const { cartItems, loading, cartTotal } = useCart();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto pb-24 lg:pb-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Cart
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Review your selected items and proceed to checkout.
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M3 3h2l.4 2M7 13h10.8l4.8 12H5.1L3 3z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Your cart is empty
            </h2>
            <a
              href="/"
              className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Continue Shopping
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-8">
                  Cart Items ({cartItems.length})
                </h2>
                <ul className="space-y-4">
                  {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item} />
                  ))}
                </ul>
              </div>
            </div>

            {/* Summary */}
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Checkout Button for Mobile */}
      {cartItems.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg lg:hidden z-50">
          <Link
            to="/checkout"
            className="block w-full bg-indigo-600 text-white py-3 px-6 rounded-xl text-center font-semibold hover:bg-indigo-700 transition-colors"
          >
            Checkout - ${cartTotal.toFixed(2)}
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
