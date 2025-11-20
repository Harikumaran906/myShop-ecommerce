import { connectDB } from "../lib/db";
import { Product } from "../lib/productModel";

export default async function HomePage() {
  await connectDB();

  const docs = await Product.find().lean();

  const products = docs.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));

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
              <a
                href={`/products/${p._id}`}
                className="btn btn-primary btn-sm"
              >
                View
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
