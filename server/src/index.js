const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');
const userRoutes = require('./routes/userRoutes');
const categoryService = require('./services/ProductCategoryService');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/api/message', (req, res) => {
    res.json({ message: 'Hello World!' });
});
app.use('/', userRoutes);

async function startApp() {
    try {

        await sequelize.authenticate();
        console.log('Database connected');

        await sequelize.sync({ alter: true });
        console.log('Database synchronized');

        await categoryService.initializeCategories();
        console.log('Categories initialized');

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });

    } catch (error) {
        console.error('Error starting application:', error);
    }
}

startApp();
