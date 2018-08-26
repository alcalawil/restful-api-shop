const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/products');

router.get('/', (req, res, next) => {
    Product.find().exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: 'List of available products',
                products: result
            })
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        });
});

router.post('/', (req, res, next) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    })
    product.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Handling ./products with POST method',
                createdProduct: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: 'Handling ./products with POST method',
                error: err
            });
        });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });

});

router.patch('/:productId', (req, res, next) => {
    const id = req.params.productId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Product.update({ _id: id }, { $set: updateOps }).exec()
    .then(result => {
        res.status(200).json({
            message: `The product was updated successfully`,
            result: result
        });
    })
    .catch( err => {
        res.status(500).json({
            message: `An error ocurred updating at ${id}`,
            error: err
        });
    })
});

router.delete('/:productId', (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id }).exec()
        .then(result => {
            res.status(200).json({
                message: `The ${id} was removed successfully`,
                details: result
            });
        })
        .catch(err => {
            res.status(500).json({
                message: `An error ocurred removing at ${id}`,
                error: err
            });
        });
});

module.exports = router;