const express = require('express');
const router = express.Router();
// Ini akan mengumpulkan semua route yang ada
const AppRoute = (customerRoute, productRoute) => {
    router.use('/customers', customerRoute);
    router.use('/products', productRoute);
    return router;
}

module.exports = AppRoute;