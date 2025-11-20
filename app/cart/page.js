"use client";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});

  useEffect(() => {
    async function loadCart() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setCart([]);
        return;
      }

      const res = await fetch("/api/cart/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username }),
      });

      const data = await res.json();
      setCart(data.cart || []);

      const details = {};

      for (const item of data.cart) {
        const pRes = await fetch(
          `/api/products/${item.productId}`
        );
        const product = await pRes.json();
        details[item.productId] = product;
      }

      setProducts(details);
    }

    loadCart();
  }, []);

  async function removeItem(productId) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return;

    const res = await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        productId,
      }),
    });

    const data = await res.json();
    setCart(data.cart);
  }

  const total = cart.reduce((sum, item) => {
    const product = products[item.productId];
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  return (
    <main className="container mt-4">
      <h1>Your Cart</h1>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item, index) => {
        const product = products[item.productId];
        if (!product) return null;

        return (
          <div key={index} className="product-card mb-3">
            <h3>{product.title}</h3>

            <img
              src={product.thumbnail}
              style={{ width: "120px", borderRadius: "6px" }}
            />

            <p>Price: ${product.price}</p>
            <p>Quantity: {item.quantity}</p>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeItem(item.productId)}
            >
              Remove 1
            </button>
          </div>
        );
      })}

      <h3 className="mt-4">Total: ${total}</h3>
    </main>
  );
}
