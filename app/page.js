async function getProducts() {
  const res = await fetch("http://localhost:3000/api/products", {
    cache: "no-store",
  });

  return res.json();
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <main className="container mt-4">
      <h1 className="page-title">MyShop</h1>
      <h2 className="mb-3">Products</h2>

      <div className="row">
        {products.map((p) => (
          <div key={p._id} className="col-12 col-md-4 mb-3">
            <div className="product-card">
              <h3>{p.title}</h3>
              <p>Price: ${p.price}</p>
              <p>Category: {p.category}</p>
              <a href={`/products/${p._id}`} className="btn btn-primary btn-sm">
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
