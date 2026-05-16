import { useEffect, useState } from "react";

const API_URL =
  "https://price-tracker-backend-jfmu.onrender.com/api/products";

function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(true);

  // LOAD PRODUCTS
  const loadProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // ADD PRODUCT
  const addProduct = async () => {
    if (!name || !price) {
      alert("Please enter a product name and price");
      return;
    }

    try {
      await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          price: Number(price),
        }),
      });

      setName("");
      setPrice("");
      loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1>📊 Smart Price Tracker</h1>

        <p style={styles.subtitle}>
          Track products and monitor their prices.
        </p>

        {/* FORM */}
        <div style={styles.form}>
          <input
            style={styles.input}
            placeholder="Product name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            style={styles.input}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button style={styles.addButton} onClick={addProduct}>
            Add
          </button>
        </div>

        {/* PRODUCTS */}
        {loading ? (
          <p>Loading products...</p>
        ) : (
          products.map((product) => (
            <div key={product.id} style={styles.card}>
              <div>
                <strong>{product.name}</strong>
                <p style={styles.price}>${product.price}</p>
              </div>

              <button
                style={styles.deleteButton}
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
    padding: "40px",
    fontFamily: "Arial, sans-serif",
  },

  container: {
    maxWidth: "700px",
    margin: "0 auto",
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },

  subtitle: {
    color: "#666",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "25px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },

  addButton: {
    backgroundColor: "#2563eb",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },

  card: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px",
    marginBottom: "12px",
    border: "1px solid #ddd",
    borderRadius: "8px",
  },

  price: {
    color: "#2563eb",
    marginTop: "5px",
  },

  deleteButton: {
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default App;