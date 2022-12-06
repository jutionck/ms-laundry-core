const express = require('express');
const router = express.Router();
const ProductRoute = (productController) => {
    const {  create, list, findById, update, remove } = productController();
    router.post('/', create);
    router.get('/', list);
    router.get('/:id', findById);
    router.put('/', update);
    router.delete('/:id', remove);
    return router;
}

module.exports = ProductRoute;