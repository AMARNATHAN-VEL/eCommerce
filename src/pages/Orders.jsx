import React from "react";
import { useOrders } from "../hooks/useOrders";
import Loader from "../components/common/Loader.jsx";

const Orders = () => {
  const { orders, loading } = useOrders();

  const userOrders = orders; // OrderContext already filters by userId

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Your Orders
          </h1>
          <p className="text-xl text-gray-600">Track your recent purchases</p>
        </div>

        {userOrders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl p-12 border border-gray-200">
            <svg
              className="w-24 h-24 text-gray-400 mx-auto mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No orders yet
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Your orders will appear here once you place them.
            </p>
            <a
              href="/"
              className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-xl text-lg font-semibold hover:bg-indigo-700 transition-colors"
            >
              Start Shopping
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {userOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
              >
                <div className="p-8 border-b border-gray-100">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">
                        Order #{order.id}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Placed on {new Date(order.date).toLocaleDateString()} at{" "}
                        {new Date(order.date).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {order.status.toUpperCase()}
                      </span>
                      <p className="text-2xl font-bold text-indigo-600 mt-1">
                        ${order.total?.toFixed(2) || "0.00"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">
                    Order Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Name:
                        </span>{" "}
                        {order.fullName}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Email:
                        </span>{" "}
                        {order.email}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Phone:
                        </span>{" "}
                        {order.phone}
                      </p>
                    </div>
                    <div>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Address:
                        </span>{" "}
                        {order.address}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          City:
                        </span>{" "}
                        {order.city}, {order.zipCode}
                      </p>
                      <p>
                        <span className="font-semibold text-gray-700">
                          Payment:
                        </span>{" "}
                        {order.paymentMethod === "cash"
                          ? "Cash on Delivery"
                          : "Credit Card"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-md font-semibold text-gray-900 mb-4">
                      Items ({order.items?.length || 0})
                    </h4>
                    <div className="space-y-3">
                      {order.items?.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-cover rounded-lg shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity || 1} × ${item.price}
                            </p>
                          </div>
                          <p className="font-bold text-indigo-600 min-w-20 text-right">
                            ${(item.price * (item.quantity || 1)).toFixed(2)}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
