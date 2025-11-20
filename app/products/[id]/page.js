"use client";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const parts = window.location.pathname.split("/");
      const foundId = parts[parts.length - 1];
      setId(foundId);
    }
  }, []);

  useEffect(() => {
    if (!id) return;

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    fetch(`${baseUrl}/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) {
    return <p>Loading...</p>;
  }

  async function addToCart() {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please log in first.");
      return;
    }

    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const res = await fetch(`${baseUrl}/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        productId: product._id,
      }),
    });

    const data = await res.json();
    alert("Added to cart!");
  }

  return (
    <main className="container mt-4">
      <h1 className="mb-3">{product.title}</h1>

      <img
        src={product.thumbnail}
        alt={product.title}
        className="img-fluid mb-3"
        style={{ maxWidth: "300px" }}
      />

      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Category:</strong> {product.category}</p>
      <p><strong>Description:</strong> {product.description}</p>

      <button onClick={addToCart} className="btn btn-primary mt-3">
        Add to Cart
      </button>
    </main>
  );
}
