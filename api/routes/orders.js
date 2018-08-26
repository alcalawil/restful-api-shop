const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Orders were successful fetched'
    });
});

router.post('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(201).json({
        message: 'A new order was created',
        orderId: orderId
    });
});

router.delete('/:orderId', (req, res, next) => {
    const orderId = req.params.orderId;
    res.status(201).json({
        message: 'The order was successful deleted',
        orderId: orderId
    });
});

module.exports = router;