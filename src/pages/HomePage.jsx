import React, { useState, useEffect, useCallback, useMemo } from "react";
import * as api from "../services/api.js";
import Loader from "../components/common/Loader.jsx";
import ProductGrid from "../components/product/ProductGrid.jsx";

const applyFilters = (items, category, query) => {
  return items.filter((product) => {
    const matchesCategory = category === "all" || product.category === category;
    const matchesQuery = product.title
      .toLowerCase()
      .includes(query.toLowerCase());
    return matchesCategory && matchesQuery;
  });
};

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  // Debounce search query to prevent excessive filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Memoized filtered products to prevent unnecessary recalculations
  const filteredProductsMemo = useMemo(() => {
    return applyFilters(products, selectedCategory, debouncedSearchQuery);
  }, [products, selectedCategory, debouncedSearchQuery]);

  // Update filtered products when memoized value changes
  useEffect(() => {
    setFilteredProducts(filteredProductsMemo);
  }, [filteredProductsMemo]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const { success, data } = await api.getAllProducts();
        if (success) {
          setProducts(data);
          const uniqueCategories = [
            "all",
            ...new Set(data.map((product) => product.category)),
          ];
          setCategories(uniqueCategories);
        } else {
          setError("Failed to load products");
        }
      } catch {
        setError("Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Search Bar */}
      <div className="text-center py-16">
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-6">
          Welcome to StyleCart
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          Discover amazing products at unbeatable prices. Shop now and enjoy
          fast delivery!
        </p>
        <div className="max-w-2xl mx-auto space-y-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            className="w-full px-6 py-4 text-lg border border-gray-200 rounded-2xl shadow-lg focus:outline-none focus:ring-4 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-300"
          />
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => handleCategoryChange(category)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "bg-white text-gray-700 border border-gray-200 hover:bg-indigo-50"
                }`}
              >
                {category === "all" ? "All" : category}
              </button>
            ))}
          </div>
        </div>
      </div>
      {error && (
        <div className="text-center py-8 text-red-600 text-lg">{error}</div>
      )}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default HomePage;
