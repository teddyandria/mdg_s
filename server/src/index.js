const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

const categoryService = require('./services/productCategoryService');

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

async function startApp() {
    try {


        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        await categoryService.initializeCategories();

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting application:', error);
    }
}

startApp();
