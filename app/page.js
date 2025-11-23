"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    async function loadProducts() {
      try {
        const res = await fetch("/api/prod");
        if (!res.ok) {
          console.error("Failed to load products, status:", res.status);
          setProducts([]);
          return;
        }
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts([]);
      }
    }

    loadProducts();
  }, []);

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts = products.filter((p) => {
    const s = search.toLowerCase().trim();
    const matchesSearch = !s || p.title.toLowerCase().includes(s);
    const matchesCategory =
      category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container mt-4">
      <h1 className="page-title">MyShop</h1>
      <h2 className="mb-3">Products</h2>

      {/* Search + Category Filter */}
      <div className="mb-4 row g-2">
        <div className="col-12 col-md-6">
          <input
            className="form-control"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-12 col-md-4">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="row">
        {filteredProducts.map((p) => (
          <div key={p._id} className="col-12 col-md-4 mb-3">
            <div className="product-card">
              <h3>{p.title}</h3>
              <p>Price: ${p.price}</p>
              <p>Category: {p.category}</p>
              <a
                href={`/products/${p._id}`}
                className="btn btn-primary btn-sm"
              >
                View
              </a>
            </div>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p>No products found for this search/filter.</p>
        )}
      </div>
    </main>
  );
}
