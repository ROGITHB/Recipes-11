const Express = require('express');
const products = require("./products.json");

//Environment variables
require('dotenv').config();

//STEP:1 create a API server
const API_SERVER = Express();

//passing incoming request body as a json
API_SERVER.use(Express.json());

//serving a static file
API_SERVER.use(Express.static('public'));

//ROUTE:1 /
API_SERVER.get('/', function (req, res) {
    // res.send('Hello, World!');
    return res.json({
        message: 'Hello, World!',
        success: true,
    });
});

//ROUTE:2 /products
API_SERVER.get('/products', function (req, res) {
    
    let result = [];
    const { limit, page } = req.query;
    if (limit && page) { 
        const start = Number(limit) * Number(page - 1);
        const end = Number(limit) * Number(page);
        result = products.slice(start, end);
    } else {
        result = products;
    }

    return res.json({
        message: 'products fetched successfully',
        success: true,
        data: result,
    });
});


//ROUTE:3 
//path: products/{productId}
API_SERVER.get('/products/:productId', function (req, res) {

    // console.log(req.params);
    const matchedProduct = products.find((_product) => _product.id === Number(req.params.productId));
    // console.log(matchedProduct);

    if (!matchedProduct) {
        return res.status(404).json({
            message: 'Product not found',
            success: false,
        });
    } else {
        return res.json({
            message: 'Product fetched successfully',
            success: true,
            data: matchedProduct,
        });
    }
});



//ROUTER:4
//path: /products
//method: post

API_SERVER.post('/products/create', function (req, res) {

    console.log(req.body);
    return res.json({
        message: 'Product added successfully',
        success: true,
    });
})

//STEP:2 Start and Listen incoming requests to the server
API_SERVER.listen(process.env.PORT, process.env.HOSTNAME, function () {
    console.log("Server started");
    console.log(`http://${process.env.HOSTNAME}:${process.env.PORT}`)
});