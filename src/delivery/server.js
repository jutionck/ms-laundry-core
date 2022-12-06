const http = require('http');
const express = require('express');
const app = express();
const Config = require('../config/config');
const jsonMiddleware = require('../delivery/middleware/json.middleware');
const InfraManager = require('../manager/infra.manager');
const RepoManager = require('../manager/repository.manager');
const ServiceManager = require('../manager/service.manager');
const CustomerController = require('./controller/customer.controller');
const CustomerRoute = require('./route/customer.route');
const AppRoute = require('./route/app.route');
const DbMigration = require('../config/db-migration');
const ProductController = require('./controller/product.controller');
const ProductRoute = require('./route/product.route');

const Server = () => {
    const { host, port } = Config();
    const infraManager = () => InfraManager(Config);
    const repoManager = () => RepoManager(infraManager);
    const serviceManager = () => ServiceManager(repoManager);
    const { initDb } = infraManager()

    const initCustomerRoute = () => {
        const customerController = () => CustomerController(serviceManager().customerService());
        return CustomerRoute(customerController);
    }

    const initProductRoute = () => {
        const productController = () => ProductController(serviceManager().productService());
        return ProductRoute(productController);
    }

    const initController = () => {
        app.use(jsonMiddleware);
        app.use(AppRoute(initCustomerRoute(), initProductRoute()));
    }

    const run = () => {
        initController();
        DbMigration(initDb()).catch();
        const server = http.createServer(app);
        server.on('error', (err) => {
            console.log(`Server failed to start ${err.message}`)
        });
        server.listen(port, () => {
            if (server.listening) {
                console.log(`Server run on ${host}:${port}`);
            }
        })
    }

    return { run }
}

module.exports = Server;