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
//const initializeFictitiousUser = require('./data/userFictif');

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
                if (!product.id || typeof product.id === "undefined" || product.id === null) {
                    console.warn(`Le produit "${product.name || 'Unnamed'}" n'a pas d'ID valide. Ignoré.`);
                    continue;
                }

                const existingProduct = await Product.findOne({
                    where: { id: product.id }
                });



                if (!existingProduct) {
                    await Product.create(product);
                } else {
                    console.log(`Produit "${product.name}" déjà présent dans la base de données.`);
                }
            }
            console.log(`Initialisation des produits terminée. ${products.length} produits ont été vérifiés.`);
        } else {
            console.log('Aucun produit trouvé dans le fichier JSON pour l\'initialisation.');
        }
    } catch (error) {
        console.error('Erreur lors de l\'initialisation des produits à partir du JSON :', error);
    }
}

async function startApp() {
    const {POSTGRES_USER,POSTGRES_PASSWORD, POSTGRES_DB, DB_HOST, DB_PORT} = process.env
    console.log(`postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${DB_HOST}:${DB_PORT}/${POSTGRES_DB}`)
    try {

        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        //await initializeFictitiousUser()
        await initializeProducts();
        await categoryService.initializeCategories();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting application:', error);
    }
}

(async () => {
    try {
        await startApp();
    } catch (error) {
        console.error('Une erreur est survenue lors du démarrage de l\'application :', error);
    }
})();
