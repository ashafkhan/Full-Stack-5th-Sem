const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/ecommerceCatalog', {
})
.then(() => console.log('MongoDB connected successfully'))
.catch(err => console.log('MongoDB connection error:', err));

// Product Schema with nested variants
const variantSchema = new mongoose.Schema({
    color: String,
    size: String,
    stock: Number
});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    category: String,
    variants: [variantSchema]
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

// Insert sample products
async function createProducts() {
    await Product.deleteMany(); // Clear previous data

    const products = [
        {
            name: 'T-Shirt',
            price: 500,
            category: 'Clothing',
            variants: [
                { color: 'Red', size: 'M', stock: 10 },
                { color: 'Blue', size: 'L', stock: 5 }
            ]
        },
        {
            name: 'Sneakers',
            price: 3000,
            category: 'Footwear',
            variants: [
                { color: 'White', size: '42', stock: 3 },
                { color: 'Black', size: '41', stock: 7 }
            ]
        }
    ];

    const result = await Product.insertMany(products);
    console.log('Products Created:', result);
}

// Queries
async function queryProducts() {
    const allProducts = await Product.find();
    console.log('All Products:', allProducts);

    const clothingProducts = await Product.find({ category: 'Clothing' });
    console.log('Clothing Products:', clothingProducts);

    const variantDetails = await Product.find({}, { name: 1, variants: 1 });
    console.log('Products with Variants:', variantDetails);
}

async function main() {
    await createProducts();
    await queryProducts();
    mongoose.connection.close();
}

main();
