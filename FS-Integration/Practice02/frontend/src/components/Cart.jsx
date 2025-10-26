import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity, clearCart } from "../store/cartSlice";

export default function Cart() {
  const items = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity: Number(quantity) }));
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {items.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <div>
          <ul>
            {items.map(item => (
              <li key={item.id} style={{ marginBottom: "10px" }}>
                {item.name} - ₹{item.price} x{" "}
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={e => handleQuantityChange(item.id, e.target.value)}
                  style={{ width: "50px" }}
                />
                <button onClick={() => dispatch(removeItem(item.id))}>Remove</button>
              </li>
            ))}
          </ul>
          <p>
            Total: ₹
            {items.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </p>
          <button onClick={() => dispatch(clearCart())}>Clear Cart</button>
        </div>
      )}
    </div>
  );
}
