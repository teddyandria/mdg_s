import express from 'express';
import cors from 'cors';
// const express = require('express');
// const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// app.get(/test/, (req, res) => {
//     res.json({ message: 'This is a test page!' });
// })

app.get('/', (req, res) => {
    res.send('Hello World!');
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
