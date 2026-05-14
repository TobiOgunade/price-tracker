import { useEffect, useState } from "react";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const loadProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const addProduct = () => {
    fetch("http://localhost:5000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        price: Number(price),
      }),
    }).then(() => {
      setName("");
      setPrice("");
      loadProducts();
    });
  };

  const deleteProduct = (id) => {
    fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
    }).then(() => {
      setProducts(products.filter((p) => p.id !== id));
    });
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>📊 Smart Price Tracker</h1>

      {/* ADD FORM */}
      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Product name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <input
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ marginRight: "10px" }}
        />

        <button onClick={addProduct}>Add Product</button>
      </div>

      {/* LIST */}
      {products.map((p) => (
        <div
          key={p.id}
          style={{
            padding: "10px",
            margin: "10px 0",
            border: "1px solid #ddd",
            borderRadius: "8px",
          }}
        >
          <strong>{p.name}</strong> — ${p.price}

          <button
            style={{ marginLeft: "10px" }}
            onClick={() => deleteProduct(p.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;