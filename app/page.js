console.log("HOME PAGE LOADED TEST LOG");

async function getProducts() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  const res = await fetch(`${baseUrl}/api/prod`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return [];
  }

  return res.json();
}

export default async function HomePage({ searchParams }) {
  const products = await getProducts();

  const search = (searchParams?.search || "").toLowerCase();
  const category = searchParams?.category || "all";

  const categories = Array.from(
    new Set(products.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      !search || p.title.toLowerCase().includes(search);
    const matchesCategory =
      category === "all" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="container mt-4">
      <h1 className="page-title">MyShop</h1>
      <h2 className="mb-3">Products</h2>

      <form className="mb-4 row g-2" method="GET">
        <div className="col-12 col-md-6">
          <input
            name="search"
            className="form-control"
            placeholder="Search products..."
            defaultValue={searchParams?.search || ""}
          />
        </div>

        <div className="col-12 col-md-4">
          <select
            name="category"
            className="form-select"
            defaultValue={category}
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-2">
          <button type="submit" className="btn btn-secondary w-100">
            Filter
          </button>
        </div>
      </form>

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
