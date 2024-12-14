const express = require('express');
const cors = require('cors');
const { sequelize, Product } = require('./models');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const categoryService = require('./services/productCategoryService');
const fs = require('fs');
const path = require('path');


const app = express();
const PORT = process.env.PORT || "3000";

// Middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/', userRoutes);
app.use('/', productRoutes);
app.use('/', cartRoutes)
app.use('/', orderRoutes)

function loadJSONData(filePath) {
    try {
        console.log(`Loading JSON data from ${filePath}`);
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Failed to load JSON data from ${filePath}:`, error);
        return [];
    }
}

async function initializeProducts() {
    try {
        const productsFilePath = path.join(__dirname, './data/products.json');
        const products = loadJSONData(productsFilePath);

        if (products.length > 0) {
            for (const product of products) {
                await Product.create(product);
            }
            console.log(`Successfully initialized ${products.length} products from the JSON file.`);
        } else {
            console.log('No products found in JSON file to initialize.');
        }
    } catch (error) {
        console.error('Error initializing products from JSON:', error);
    }
}


async function startApp() {
    try {

        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        await initializeProducts();
        await categoryService.initializeCategories();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting application:', error);
    }
}

startApp();
