const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/productDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected successfully"))
.catch(err => console.error("MongoDB connection error:", err));


const Product = require('./models/Product');

// CREATE a new product
async function createProduct() {
    try {
        const product = new Product({
            name: "Laptop",
            price: 75000,
            category: "Electronics"
        });
        const result = await product.save();
        console.log("Product Created:", result);
    } catch (err) {
        console.error("Error creating product:", err.message);
    }
}

// READ all products
async function getProducts() {
    try {
        const products = await Product.find();
        console.log("All Products:", products);
    } catch (err) {
        console.error("Error fetching products:", err.message);
    }
}

// UPDATE a product by ID
async function updateProduct(productId) {
    try {
        const updated = await Product.findByIdAndUpdate(
            productId,
            { price: 80000 },
            { new: true, runValidators: true }
        );
        console.log("Updated Product:", updated);
    } catch (err) {
        console.error("Error updating product:", err.message);
    }
}

// DELETE a product by ID
async function deleteProduct(productId) {
    try {
        const deleted = await Product.findByIdAndDelete(productId);
        console.log("Deleted Product:", deleted);
    } catch (err) {
        console.error("Error deleting product:", err.message);
    }
}

// Call functions here for testing
// createProduct();
// getProducts();
// updateProduct("68e2763263beb6e35bad3fa4");
// deleteProduct("68e2763263beb6e35bad3fa4");
