const ResponseMessage = require('../../shared/model/response');
const CustomerController = (customerService) => {
    const { registerNewCustomer, findAllCustomer, findCustomerById, removeCustomer, updateOldCustomer } = customerService();

    const create = async (req, res) => {
        try {
            const payload = req.body;
            const customer = await registerNewCustomer(payload);
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', customer))
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message))
        }
    }

    const list = async (req, res) => {
        try {
            const { keyword, page, size, sortBy, sortType } = req.query
            const { count, rows } = await findAllCustomer(keyword, page, size, sortBy, sortType);
            res.json(ResponseMessage().pagination(
                res.statusCode, 'SUCCESS', rows,
                keyword, page, count, size, sortBy, sortType
            ));
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message))
        }
    }

    const findById = async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await findCustomerById(id);
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', customer))
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message))
        }
    }

    const update = async (req, res) => {
        try {
            const payload = req.body;
            const customer = await updateOldCustomer(payload);
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', customer))
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message))
        }
    }

    const remove = async (req, res) => {
        try {
            const { id } = req.params;
            const customer = await removeCustomer(id);
            res.json(ResponseMessage().successMessage(res.statusCode, 'SUCCESS', customer))
        } catch (err) {
            res.status(400).json(ResponseMessage().errorMessage(res.statusCode, err.message))
        }
    }
    return {
        create, list, findById, update, remove
    }
}

module.exports = CustomerController;