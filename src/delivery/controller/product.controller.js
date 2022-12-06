const ResponseMessage = require('../../shared/model/response');
const ProductController = (productService) => {
    const { registerNewProduct, findAllProduct, findProductById, removeProduct, updateOldProduct } = productService();

    const create = async (req, res) => {
        try {
            const payload = req.body;
            const customer = await registerNewProduct(payload);
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', customer));
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message));
        }
    }

    const list = async (req, res) => {
        try {
            const { keyword, page, size, sortBy, sortType } = req.query
            const { count, productWithPrice } = await findAllProduct(keyword, page, size, sortBy, sortType);
            res.json(ResponseMessage().pagination(
                res.statusCode, 'SUCCESS', productWithPrice,
                keyword, page, count, size, sortBy, sortType
            ));
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message));
        }
    }

    const findById = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await findProductById(id);
            if (typeof product !== 'object') {
                res.status(400).json(ResponseMessage().errorMessage(res.statusCode, product));
                return
            }
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', product));
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message));
        }
    }

    const update = async (req, res) => {
        try {
            const payload = req.body;
            const product = await updateOldProduct(payload);
            if (typeof product !== 'object') {
                res.status(400).json(ResponseMessage().errorMessage(res.statusCode, product));
                return
            }
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', product));
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message));
        }
    }

    const remove = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await removeProduct(id);
            if (product !== 1) {
                res.status(400).json(ResponseMessage().errorMessage(res.statusCode, product));
                return
            }
            res.status(204).json(ResponseMessage().successMessage(res.statusCode, ''));
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message));
        }
    }
    return {
        create, list, findById, update, remove
    }
}

module.exports = ProductController;