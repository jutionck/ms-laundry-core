const Customer = require('../model/customer.model');
const {Op, Error} = require('sequelize');

const CustomerRepository = (db) => {
    const create = async (payload) => {
        try {
            if (await isNameExist(payload.name)) {
                return `Customer with name ${payload.name} already exist`;
            }

            if (await isPhoneNumberExist(payload.phoneNumber)) {
                return `Customer with phone number ${payload.phoneNumber} already exist`;
            }

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

            if (await isNameExist(payload.name, payload.id)) {
                return `Customer with name ${payload.name} already exist`;
            }

            if (await isPhoneNumberExist(payload.phoneNumber, payload.id)) {
                return `Customer with phone number ${payload.phoneNumber} already exist`;
            }

            const result = await Customer(db).update(payload, {
                where: { id: payload.id },
                returning: true,
            });
            return result[1][0];
        } catch (err) {
            return err.message
        }
    }

    const isNameExist = async (name, excludeId) => {
        if (excludeId) {
            return await Customer(db).findOne({
                where: {
                    name: name,
                    id: { [Op.ne] : excludeId }
                }
            });
        }
        return await Customer(db).findOne({
            where: {
                name: name
            }
        });
    }

    const isPhoneNumberExist = async (phoneNumber, excludeId) => {
        if (excludeId) {
            return await Customer(db).findOne({
                where: {
                    phoneNumber: phoneNumber,
                    id: { [Op.ne] : excludeId }
                }
            });
        }
        return await Customer(db).findOne({
            where: {
                phoneNumber: phoneNumber
            }
        });
    }

    return {
        create, list, getById, remove, update
    }

}

module.exports = CustomerRepository;