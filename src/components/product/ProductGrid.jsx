import React from "react";
import ProductCard from "./ProductCard.jsx";

const ProductGrid = React.memo(({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 py-8 px-4 sm:px-6 lg:px-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
});

export default ProductGrid;
