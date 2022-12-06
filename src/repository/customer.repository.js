const Customer = require('../model/customer.model');
const {Op} = require('sequelize');

const CustomerRepository = (db) => {
    const create = async (payload) => {
        try {
            return await Customer(db).create(payload);
        } catch (err) {
            err.message;
        }
    }

    const list = async (keyword = '', page, size, sortBy = 'created_at', sortType = 'desc') => {
        try {
            const offset = size * ( page - 1);
            const { count, rows } = await Customer(db).findAndCountAll({
                where: {
                    [Op.or] : [
                        { name: { [Op.iLike] : `%${keyword}%` } },
                        { phoneNumber: { [Op.iLike] : `%${keyword}%` } },
                    ]
                },
                offset: offset,
                limit: size,
                order: [
                    [sortBy, sortType]
                ],
            })
            return { count, rows }
        } catch (err) {
            return err.message
        }
    }

    const getById = async (id) => {
        try {
            const customer = await Customer(db).findByPk(id);
            if (!customer) return `Customer with value ID ${id} not found!`;
            return customer;
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const customer = await Customer(db).findByPk(id);
            if (!customer) return `Customer with value ID ${id} not found!`;
            return await Customer(db).destroy({ where: { id: id }});
        } catch (err) {
            return err.message
        }
    }

    const update = async (payload) => {
        try {
            const customer = await Customer(db).findByPk(payload.id);
            if (!customer) return `Customer with value ID ${payload.id} not found!`;
            return await Customer(db).update(payload, {
                where: { id: payload.id }
            });
        } catch (err) {
            return err.message
        }
    }

    return {
        create, list, getById, remove, update
    }

}

module.exports = CustomerRepository;