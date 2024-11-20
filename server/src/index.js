const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize, User } = require('./models');
const userRoutes = require('./routes/userRoutes');
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: 'http://localhost:8080',
    credentials: true,
}));

app.use(express.json());

app.get('/api/message', (req, res) => {
    res.json({message:'Hello World!'});
});

app.use('/', userRoutes)

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
