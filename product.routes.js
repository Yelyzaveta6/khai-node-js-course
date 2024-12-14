const express = require('express');
const products = require('./products');
const { blockSpecialBrand } = require('./middleware');

const router = express.Router();

// handle get request for path /products
router.get('/products', (request, response) => {
   return response.json(products);
});

// handle get request for path /products/:brand
router.get('/products/:brand', blockSpecialBrand, (request, response) => {
    
   const { brand } = request.params; // Access the brand parameter from the URL

   // Filter products based on the brand parameter
   const filteredProducts = products.filter(product => product.brand === brand);

   return response.json(filteredProducts); // Send the filtered products as a JSON response
});

router.get('/products/id/:id', (request, response) => {
    const { id } = request.params;
    const numId = Number(id);
    // Filter products based on the id parameter
    const filteredProductById = products.find(product => product.id === numId);
    if(filteredProductById) {
        return response.json(filteredProductById); // Send the filtered product as a JSON response
    } else {
        return response.json({ error: `Product with ID ${id} not found` });
    }
   
 });

router.get('/productswitherror', (request, response) => {
    let err = new Error("processing error")
    err.statusCode = 400
    throw err
 });

module.exports = router;