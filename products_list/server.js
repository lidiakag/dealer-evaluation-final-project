const express = require("express");
const cors = require("cors");
const products = require("./products.json");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Product Details Microservice is running",
    endpoints: ["/products"]
  });
});

app.get("/products", (req, res) => {
  res.json(products);
});

app.listen(PORT, () => {
  console.log(`Product Details service running on port ${PORT}`);
});