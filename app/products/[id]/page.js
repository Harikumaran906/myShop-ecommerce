"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductPage() {
  const params = useParams();
  const id = params?.id;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    console.log("ProductPage useParams id:", id);

    if (!id) return;

    fetch(`/api/prod/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data))
      .catch((err) => {
        console.error("Error fetching product:", err);
      });
  }, [id]);

  if (!product) return <p>Loading...</p>;

  async function addToCart() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Please log in first.");

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

      <p>
        <strong>Price:</strong> ${product.price}
      </p>
      <p>
        <strong>Category:</strong> {product.category}
      </p>
      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <button onClick={addToCart} className="btn btn-primary mt-3">
        Add to Cart
      </button>
    </main>
  );
}
