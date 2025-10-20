const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

const products = [
  { id: 1, name: 'Laptop', price: 75000 },
  { id: 2, name: 'Headphones', price: 2500 },
  { id: 3, name: 'Smartphone', price: 40000 },
  { id: 4, name: 'Keyboard', price: 1500 },
];

app.get('/api/products', (req, res) => {
  console.log('✅ GET /api/products called');
  res.json(products);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
