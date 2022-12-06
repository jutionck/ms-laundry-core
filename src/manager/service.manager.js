const CustomerService = require('../service/customer.service');
const ProductService = require('../service/product.service');
const ServiceManager = (repoManager) => {
    const { customerRepo, productRepo } = repoManager();
    // All service
    const customerService = () => {
        return () => CustomerService(customerRepo());
    }

    const productService = () => {
        return () => ProductService(productRepo());
    }

    return {
        customerService, productService
    }
}

module.exports = ServiceManager;