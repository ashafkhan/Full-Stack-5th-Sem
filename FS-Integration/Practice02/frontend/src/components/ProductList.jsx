import React from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/cartSlice";

const products = [
  { id: 1, name: "Laptop", price: 50000 },
  { id: 2, name: "Phone", price: 20000 },
  { id: 3, name: "Headphones", price: 2000 },
];

export default function ProductList() {
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Products</h2>
      <ul>
        {products.map(product => (
          <li key={product.id} style={{ marginBottom: "10px" }}>
            {product.name} - ₹{product.price}{" "}
            <button onClick={() => dispatch(addItem(product))}>Add to Cart</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
