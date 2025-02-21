import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/welcome', (req, res) => {
    res.send('welcome to the world of express');
});

app.listen(5002, () => {
    console.log("Server is running on port 5002");
});