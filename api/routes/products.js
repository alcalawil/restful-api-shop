const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling ./products'
    });
});

router.post('/', (req, res, next) => {
    const createdProduct = req.body;
    res.status(201).json({
        message: 'Handling ./products with POST method',
        createdProduct: createdProduct
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if (id === 'ah1') {
        res.status(200).json({
            message: 'You have discovered the secret ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'Wrong Id, try again',
            id: id
        });
    }
});

module.exports = router;