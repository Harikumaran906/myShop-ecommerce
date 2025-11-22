"use client";
import { useEffect, useState } from "react";

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
  });

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  useEffect(() => {
    async function loadCart() {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) return;

      const res = await fetch(`${baseUrl}/api/cart/get`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user.username }),
      });

      const data = await res.json();
      setCart(data.cart || []);

      const details = {};
      for (const item of data.cart) {
        const pRes = await fetch(`${baseUrl}/api/prod/${item.productId}`);
        const product = await pRes.json();
        details[item.productId] = product;
      }
      setProducts(details);
    }

    loadCart();
  }, [baseUrl]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  const total = cart.reduce((sum, item) => {
    const product = products[item.productId];
    if (!product) return sum;
    return sum + product.price * item.quantity;
  }, 0);

  async function placeOrder() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in first.");
      return;
    }

    const order = {
      items: cart.map((c) => ({
        productId: c.productId,
        quantity: c.quantity,
      })),
      total,
      customer: form,
      username: user.username,
    };

    const res = await fetch(`${baseUrl}/api/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
    });

    await res.json();

    await fetch(`${baseUrl}/api/cart/clear`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: user.username }),
    });

    alert("Order placed!");
  }

  async function payWithStripe() {
    const res = await fetch(`${baseUrl}/api/pay`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: cart.map((c) => ({
          title: products[c.productId].title,
          price: products[c.productId].price,
          quantity: c.quantity,
        })),
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  }

  return (
    <main className="container mt-4">
      <h1>Checkout</h1>

      <div className="mb-3">
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label>Address</label>
        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <h3 className="mt-4">Order Summary</h3>

      {cart.length === 0 && <p>No items in cart.</p>}

      {cart.map((item, idx) => {
        const p = products[item.productId];
        if (!p) return null;

        return (
          <div key={idx} className="product-card mb-2">
            <p>
              {p.title} - ${p.price} × {item.quantity}
            </p>
          </div>
        );
      })}

      <h4>Total: ${total}</h4>

      <button onClick={placeOrder} className="btn btn-success mt-3">
        Place Order
      </button>

      <button onClick={payWithStripe} className="btn btn-primary mt-3 ms-3">
        Pay with Card
      </button>
    </main>
  );
}
