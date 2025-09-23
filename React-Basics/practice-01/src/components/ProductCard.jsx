// src/ProductCard.js
import React from "react";

const ProductCard = ({ name, price, inStock }) => {
  const stockText = inStock ? "In Stock" : "Out of Stock";
  const stockStyle = { color: inStock ? "green" : "red" };

  return (
    <div style={{
      border: "1px solid #ccc",
      borderRadius: "10px",
      padding: "20px",
      width: "200px",
      margin: "10px",
      boxShadow: "2px 2px 12px rgba(0,0,0,0.1)"
    }}>
      <h2>{name}</h2>
      <p>Price: ${price}</p>
      <p style={stockStyle}>{stockText}</p>
    </div>
  );
};

export default ProductCard;
