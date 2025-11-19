"use client";
import { useEffect, useState } from "react";

export default function EditProductPage({ params }) {
  const [allowed, setAllowed] = useState(false);
  const [form, setForm] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    thumbnail: "",
  });

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (!saved) return;

    const user = JSON.parse(saved);

    if (user.isAdmin === true) {
      setAllowed(true);
      loadProduct();
    }
  }, []);

  async function loadProduct() {
    const res = await fetch(
      `http://localhost:3000/api/products/${params.id}`
    );
    const data = await res.json();

    setForm({
      title: data.title,
      price: data.price,
      category: data.category,
      description: data.description,
      thumbnail: data.thumbnail,
    });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function updateProduct() {
    await fetch(`http://localhost:3000/api/products/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: form.title,
        price: Number(form.price),
        category: form.category,
        description: form.description,
        thumbnail: form.thumbnail,
      }),
    });

    alert("Product updated!");
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
      <h1>Edit Product</h1>

      <div className="mb-3">
        <label>Title</label>
        <input
          name="title"
          className="form-control"
          value={form.title}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Price</label>
        <input
          name="price"
          type="number"
          className="form-control"
          value={form.price}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Category</label>
        <input
          name="category"
          className="form-control"
          value={form.category}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <input
          name="description"
          className="form-control"
          value={form.description}
          onChange={handleChange}
        />
      </div>

      <div className="mb-3">
        <label>Thumbnail URL</label>
        <input
          name="thumbnail"
          className="form-control"
          value={form.thumbnail}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary" onClick={updateProduct}>
        Save Changes
      </button>
    </main>
  );
}
