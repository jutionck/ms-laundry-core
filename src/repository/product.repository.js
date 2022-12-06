const Product = require('../model/entity/product.model');
const ProductPrice = require('../model/entity/product-price.model');
const ProductPriceDto = require("../model/dto/product.dto");
const {Op} = require("sequelize");

const ProductRepository = (db) => {
    const product = Product(db);
    const productPrice = ProductPrice(db);
    product.hasMany(productPrice);

    const create = async (payload) => {
        try {
            const newProduct = await product.create(payload);
            await productPrice.create({price: payload.productPrice, mstProductId: newProduct.id})
            return newProduct
        } catch (err) {
            err.message;
        }
    }

    const list = async (keyword = '', page, size, sortBy = 'created_at', sortType = 'desc') => {
        try {
            const offset = size * (page - 1);
            const productWithPrice = [];
            const {count, rows} = await product.findAndCountAll({
                where: {
                    [Op.or]: [
                        {name: {[Op.iLike]: `%${keyword}%`}},
                    ]
                },
                offset: offset,
                limit: size,
                order: [
                    [sortBy, sortType]
                ],
                include: {
                    model: productPrice,
                    where: {
                        isActive: true
                    }
                }
            });

            for (let i = 0; i < rows.length; i++) {
                productWithPrice.push(ProductPriceDto(rows, i));
            }

            return {count, productWithPrice};

        } catch (err) {
            return err.message
        }
    }

    const getById = async (id) => {
        try {
            const prod = await product.findByPk(id, {
                include: [
                    {
                        model: productPrice,
                        where: {isActive: true}
                    }]
            });
            if (!prod) return `Product with value ID ${id} not found!`;
            return ProductPriceDto(prod);
        } catch (err) {
            return err.message
        }
    }

    const remove = async (id) => {
        try {
            const prod = await product.findByPk(id);
            if (!prod) return `Product with value ID ${id} not found!`;
            const result = await product.destroy({where: {id: id}});
            await productPrice.destroy({where: {mstProductId: id}});
            return result;
        } catch (err) {
            return err.message
        }
    }

    const update = async (payload) => {
        try {
            const getProduct = await product.findByPk(payload.id);
            if (!getProduct) return `Product with value ID ${payload.id} not found!`;
            const updateProduct = await product.update(payload, {
                where: {id: payload.id},
                returning: true
            });
            await productPrice.update({
                price: payload.productPrice,
                mstProductId: updateProduct.id,
                isActive: payload.isActive
            }, {
                where: {mstProductId: payload.id}
            })
            return updateProduct[1][0];
        } catch (err) {
            return err.message
        }
    }

    return {
        create, list, getById, remove, update
    }

}

module.exports = ProductRepository;