const Product = require('../model/product.model');
const {Op} = require('sequelize');

const ProductRepository = (db) => {
    const create = async (payload) => {
        try {
            return await Product(db).create(payload);
        } catch (err) {
            err.message;
        }
    }

    const list = async (keyword = '', page, size, sortBy = 'created_at', sortType = 'desc') => {
        try {
            const offset = size * ( page - 1);
            const { count, rows } = await Product(db).findAndCountAll({
                where: {
                    [Op.or] : [
                        { name: { [Op.iLike] : `%${keyword}%` } },
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
            const product = await Product(db).findByPk(id);
            if (!product) return `Product with value ID ${id} not found!`;
            return product;
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const product = await Product(db).findByPk(id);
            if (!product) return `Product with value ID ${id} not found!`;
            return await Product(db).destroy({ where: { id: id }});
        } catch (err) {
            return err.message
        }
    }

    const update = async (payload) => {
        try {
            const product = await Product(db).findByPk(payload.id);
            if (!product) return `Product with value ID ${payload.id} not found!`;
            return await Product(db).update(payload, {
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

module.exports = ProductRepository;