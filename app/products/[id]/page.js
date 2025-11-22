"use client";
import { useEffect, useState } from "react";

export default function ProductPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("🔥 Product page mounted");
    console.log("👉 params =", params);
    console.log("👉 id =", id);

    if (!id) {
      console.log("⛔ No ID found! Returning...");
      return;
    }

    const url = `/api/prod/${id}`;
    console.log("🌐 Fetching:", url);

    fetch(url)
      .then((res) => {
        console.log("📥 Fetch response status:", res.status);
        return res.json();
      })
      .then((data) => {
        console.log("📦 Fetched product data:", data);
        setProduct(data);
      })
      .catch((err) => {
        console.error("💥 FETCH ERROR:", err);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  async function addToCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please log in first.");

    console.log("🛒 Adding to cart:", product._id);

    await fetch(`/api/cart/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: user.username,
        productId: product._id,
      }),
    });

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
