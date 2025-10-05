# MongoDB CRUD Operations with Mongoose

This is a simple Node.js project demonstrating CRUD (Create, Read, Update, Delete) operations using MongoDB and Mongoose.

## Project Structure

MongoDB/
├── index.js
├── models/
│ └── Product.js
├── package.json
└── package-lock.json

## Features

- Connects to MongoDB using Mongoose.
- Define a `Product` model with `name`, `price`, and `category`.
- Perform CRUD operations:
  - Create a product
  - Read all products
  - Update a product by ID
  - Delete a product by ID

## Installation

1. Clone the repository or create your project folder:

```bash
git clone <repo-url>
cd MongoDB
Install dependencies:

bash
Copy code
npm install
Usage
Make sure MongoDB is running:

bash
Copy code
mongod --dbpath=/Users/ashaf/data/db
Start the app with nodemon:

bash
Copy code
npm run dev
Edit index.js to call CRUD functions:

javascript
Copy code
createProduct();
getProducts();
updateProduct("<PRODUCT_ID>");
deleteProduct("<PRODUCT_ID>");
Example Output
yaml
Copy code
MongoDB connected successfully
All Products: [
  {
    _id: 68e26e388d1e5e72f22380aa,
    name: 'Laptop',
    price: 75000,
    category: 'Electronics',
    createdAt: 2025-10-05T13:10:16.478Z,
    updatedAt: 2025-10-05T13:10:16.478Z
  }
]

Notes:
Replace <PRODUCT_ID> with the actual product _id from the database.

Ensure MongoDB is running locally before starting the app.