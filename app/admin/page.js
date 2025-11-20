"use client";
import { useEffect, useState } from "react";

export default function AdminPage() {
  const [allowed, setAllowed] = useState(false);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("user");

    if (!saved) return;

    const user = JSON.parse(saved);

    if (user.isAdmin === true) {
      setAllowed(true);
      loadData();
    }
  }, []);

  async function loadData() {
    const resP = await fetch("/api/products");
    const resO = await fetch("/api/orders");

    setProducts(await resP.json());
    setOrders(await resO.json());
  }

  if (!allowed) {
    return (
      <main className="container mt-4">
        <h1>Admin Only</h1>
        <p>You are not allowed to view this page.</p>
      </main>
    );
  }

  return (
    <main className="container mt-4">
      <h1>Admin Dashboard</h1>

      <h2 className="mt-4">Products</h2>
      {products.length === 0 && <p>No products found</p>}

      {products.map((p) => (
        <div key={p._id} className="product-card mb-2">
          <h3>{p.title}</h3>
          <p>${p.price}</p>

          <p style={{ fontSize: "12px", color: "gray" }}>
            ID: {p._id}
          </p>
        </div>
      ))}

      <h2 className="mt-4">Orders</h2>
      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map((o) => (
        <div key={o._id} className="product-card mb-2">
          <p>Total: ${o.total}</p>
          <p>Customer: {o.customer.name}</p>
        </div>
      ))}
    </main>
  );
}
