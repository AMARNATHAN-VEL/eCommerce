import React from "react";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-medium text-gray-600">Loading...</p>
    </div>
  );
};

export default Loader;
