"use client";
import { useEffect, useState } from "react";

export default function AdminProductsPage() {
  const [allowed, setAllowed] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return;

    const user = JSON.parse(saved);
    if (user.isAdmin === true) {
      setAllowed(true);
      loadProducts();
    }
  }, []);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function deleteProduct(id) {
    await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });
    loadProducts();
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
      <h1>Manage Products</h1>

      {products.map((p) => (
        <div key={p._id} className="product-card mb-3">
          <h3>{p.title}</h3>
          <p>${p.price}</p>

          <button
            className="btn btn-danger"
            onClick={() => deleteProduct(p._id)}
          >
            Delete
          </button>

          <a
            href={`/admin/edit-product/${p._id}`}
            className="btn btn-secondary ms-2"
          >
            Edit
          </a>
        </div>
      ))}
    </main>
  );
}
