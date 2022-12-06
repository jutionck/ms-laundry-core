const express = require('express');
const router = express.Router();
// Ini akan mengumpulkan semua route yang ada
const AppRoute = (customerRoute) => {
    router.use('/customers', customerRoute);
    return router;
}

module.exports = AppRoute;