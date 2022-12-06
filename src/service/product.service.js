const ProductService = (productRepo) => {
    const {  create, list, getById, remove, update } = productRepo();
    const registerNewProduct = async (payload) => {
        try {
            return await create(payload);
        } catch (err) {
            return err.message;
        }
    }
    const findAllProduct = async () => {
        try {
            return await list();
        } catch (err) {
            return err.message;
        }
    }

    const findProductById = async (id) => {
        try {
            return await getById(id);
        } catch (err) {
            return err.message;
        }
    }

    const removeProduct = async (id) => {
        try {
            return await remove(id);
        } catch (err) {
            return err.message;
        }
    }

    const updateOldProduct = async (payload) => {
        try {
            return await update(payload);
        } catch (err) {
            return err.message;
        }
    }

    return {
        registerNewProduct, findAllProduct, findProductById, removeProduct, updateOldProduct
    }
}

module.exports = ProductService;