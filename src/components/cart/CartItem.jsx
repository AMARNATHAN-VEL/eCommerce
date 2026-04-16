import React, { useState } from "react";
import { useCart } from "../../hooks/useCart";

const CartItem = ({ cartItem }) => {
  const { updateItemQuantity, removeItem } = useCart();
  const [updating, setUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1 || updating) return;
    setUpdating(true);
    try {
      await updateItemQuantity(cartItem.id, newQuantity);
    } finally {
      setUpdating(false);
    }
  };

  const handleRemove = async () => {
    if (updating) return;
    await removeItem(cartItem.id);
  };

  return (
    <li className="flex py-6 sm:flex-row flex-col sm:items-center gap-4 border-b border-gray-200 last:border-b-0">
      {/* Image */}
      <div className="w-24 h-24 shrink-0">
        <img
          src={cartItem.image || "/api/placeholder/96/96"}
          alt={cartItem.name}
          className="w-full h-full object-cover rounded-lg shadow-md"
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">
          {cartItem.name}
        </h3>
        <p className="text-sm text-gray-500 mb-3">{cartItem.category}</p>
        <p className="text-2xl font-bold text-indigo-600 mb-4">
          ${cartItem.price}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => handleQuantityChange(cartItem.quantity - 1)}
          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={cartItem.quantity <= 1 || updating}
        >
          {updating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "-"
          )}
        </button>
        <span className="w-12 text-center text-lg font-semibold text-gray-900 min-w-12">
          {cartItem.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(cartItem.quantity + 1)}
          className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50"
          disabled={updating}
        >
          {updating ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            "+"
          )}
        </button>
      </div>

      {/* Total Price */}
      <div className="text-right flex flex-col items-end gap-2">
        <span className="text-2xl font-bold text-indigo-600">
          ${(cartItem.price * cartItem.quantity).toFixed(2)}
        </span>
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 p-2 -m-2 rounded-lg hover:bg-red-50 transition-colors"
          title="Remove item"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

export default CartItem;
