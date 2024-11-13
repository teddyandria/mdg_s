const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;
const { sequelize, User } = require('./models');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

sequelize.authenticate()
    .then(() => console.log('Database connected'))
    .catch(err => console.log('Error: ' + err));

app.get('/users', async (req, res) => {
    const users = await User.findAll();
    res.json(users);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
