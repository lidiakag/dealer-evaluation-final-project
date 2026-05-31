const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const dealerData = {
  Headphones: {
    Binglee: 30,
    "DXC Electronics": 20,
    Bobay: 20
  },
  Laptop: {
    Binglee: 850,
    "DXC Electronics": 800,
    Bobay: 780
  },
  Mouse: {
    Binglee: 25,
    "DXC Electronics": 20,
    Bobay: 22
  },
  Printer: {
    Binglee: 150,
    "DXC Electronics": 145,
    Bobay: 140
  }
};

app.get("/", (req, res) => {
  res.json({
    message: "Dealer Pricing Microservice is running",
    endpoints: ["/dealers/:product", "/price/:product/:dealer", "/prices/:product"]
  });
});

app.get("/dealers/:product", (req, res) => {
  const product = req.params.product;
  const dealers = dealerData[product];

  if (!dealers) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(Object.keys(dealers));
});

app.get("/price/:product/:dealer", (req, res) => {
  const product = req.params.product;
  const dealer = decodeURIComponent(req.params.dealer);

  if (!dealerData[product] || dealerData[product][dealer] === undefined) {
    return res.status(404).json({ error: "Price not found" });
  }

  res.json({
    product,
    dealer,
    price: dealerData[product][dealer]
  });
});

app.get("/prices/:product", (req, res) => {
  const product = req.params.product;

  if (!dealerData[product]) {
    return res.status(404).json({ error: "Product not found" });
  }

  res.json(dealerData[product]);
});

app.listen(PORT, () => {
  console.log(`Dealer Pricing service running on port ${PORT}`);
});