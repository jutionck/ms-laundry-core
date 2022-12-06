const CustomerRepository = require('../repository/customer.repository');
const ProductRepository = require('../repository/product.repository');
const RepoManager = (infraManager) => {
    const { initDb } = infraManager();
    const db = initDb();
    // All repository
    const customerRepo = () => {
        return () => CustomerRepository(db);
    }

    const productRepo = () => {
        return () => ProductRepository(db);
    }

    return {
        customerRepo, productRepo
    }
}

module.exports = RepoManager;