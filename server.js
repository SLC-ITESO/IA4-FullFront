const express = require('express');

const app = express();

const productRoutes = require('./routes/product-route');
const cartRoutes = require('./routes/cart-route');
const authMiddleware = require('./middlewares/auth')

const path = require('path')

const PORT = 3101;

function logger (req, res, next) {
    console.log("log ",req.url);
    next()
}
console.log(__dirname);

app.use(express.static(path.join(__dirname, 'site')))

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Integrated Assignment 4. MANN CO.')
})

app.use('/api/products',logger, productRoutes);
app.use('/api/cart', logger,cartRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});