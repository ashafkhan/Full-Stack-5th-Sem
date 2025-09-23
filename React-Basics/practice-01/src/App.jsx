// src/App.js
import React from "react";
import ProductCard from "./ProductCard";

function App() {
  const products = [
    { name: "Laptop", price: 999, inStock: true },
    { name: "Smartphone", price: 499, inStock: false },
    { name: "Headphones", price: 199, inStock: true },
  ];

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {products.map((product, index) => (
        <ProductCard
          key={index}
          name={product.name}
          price={product.price}
          inStock={product.inStock}
        />
      ))}
    </div>
  );
}

export default App;
