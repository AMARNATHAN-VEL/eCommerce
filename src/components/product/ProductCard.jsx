import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

const ProductCard = React.memo(({ product }) => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  const handleAddToCart = async () => {
    const result = await addItem(product, 1);
    if (result.success) {
      // Optional: show success toast
      console.log("Added to cart");
    }
  };

  const displayName = product.title || product.name;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group relative flex flex-col min-h-[22rem]">
      <div className="h-72 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
        <img
          src={product.image || "/api/placeholder/300/300"}
          alt={displayName}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <span className="text-xs text-indigo-600 uppercase tracking-wide font-medium">
          {product.category}
        </span>
        <h3 className="mt-2 text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors truncate">
          {displayName}
        </h3>
        <p className="mt-2 text-2xl font-bold text-indigo-600">
          ${product.price}
        </p>
        <div className="mt-4">
          <div className="flex gap-3">
            <button
              onClick={handleViewDetails}
              className="flex-1 bg-indigo-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View Details
            </button>
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductCard;
