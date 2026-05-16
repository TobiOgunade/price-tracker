const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "iPhone 15", price: 999 },
  { id: 2, name: "MacBook Air", price: 1299 },
  { id: 3, name: "AirPods Pro", price: 249 },
];

app.get("/", (req, res) => {
  res.send("Smart Price Tracker API is running");
});

app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const { name, price } = req.body;

  if (!name || price === undefined) {
    return res.status(400).json({ message: "Name and price are required" });
  }

  const newProduct = {
    id: Date.now(),
    name,
    price: Number(price),
  };

  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);

  products = products.filter((product) => product.id !== id);

  res.json({ message: "Product deleted successfully" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});