const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "MacBook Air", price: 1299 },
  { id: 3, name: "AirPods Pro", price: 249 }
];

// GET all products
app.get("/api/products", (req, res) => {
  res.json(products);
});

// ADD product
app.post("/api/products", (req, res) => {
  const newProduct = {
    id: Date.now(),
    name: req.body.name,
    price: req.body.price
  };

  products.push(newProduct);
  res.json(newProduct);
});

// DELETE product
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter((p) => p.id !== id);
  res.json({ message: "Deleted successfully" });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});