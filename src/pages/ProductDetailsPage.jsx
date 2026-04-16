import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import * as api from "../services/api.js";
import Loader from "../components/common/Loader.jsx";

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        const { success, data, error } = await api.getProductById(id);
        if (success && data) {
          setProduct(data);
        } else {
          setError(error || "Product not found");
        }
      } catch {
        setError("Product not found");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <Loader />;

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {error || "Product not found"}
          </h1>
          <a
            href="/"
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Back to Home
          </a>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({ ...product }, 1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center text-indigo-600 hover:text-indigo-500 font-medium mb-8"
        >
          ← Back to products
        </a>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Image */}
          <div>
            <img
              src={product.image || "/api/placeholder/500/600"}
              alt={product.title || product.name}
              className="w-full h-96 lg:h-125 object-cover rounded-xl shadow-2xl"
            />
          </div>
          {/* Details */}
          <div className="space-y-6">
            <div>
              <span className="inline-block bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-4 leading-tight">
                {product.title || product.name}
              </h1>
              <p className="text-3xl lg:text-4xl font-bold text-indigo-600 mt-2">
                ${product.price}
              </p>
            </div>

            {product.description && (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Description
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  {product.description}
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Stock & Availability
              </h3>
              <p className="text-2xl font-bold text-green-600">
                {product.stock || "In Stock"}
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-indigo-600 text-white py-4 px-8 rounded-xl text-lg font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
