const CustomerRepository = require('../repository/customer.repository');
const RepoManager = (infraManager) => {
    const { initDb } = infraManager();
    const db = initDb();
    // All repository
    const customerRepo = () => {
        return () => CustomerRepository(db);
    }

    return {
        customerRepo,
    }
}

module.exports = RepoManager;