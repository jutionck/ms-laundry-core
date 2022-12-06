const ProductService = (productRepo) => {
    const {  create, list, getById, remove, update } = productRepo();
    const registerNewProduct = async (payload) => {
        try {
            return await create(payload);
        } catch (err) {
            return err.message;
        }
    }
    const findAllProduct = async (keyword, page, size, sortBy, sortType) => {
        try {
            if (isNaN(page) || isNaN(size)) {
                page = 1; size = 10;
            }
            const { count, productWithPrice } = await list(keyword, page, size, sortBy, sortType);
            return { count, productWithPrice }
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