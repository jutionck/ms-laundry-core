const Product = require('../model/entity/product.model');
const ProductPrice = require('../model/entity/product-price.model');
const ProductPriceDto = require("../model/dto/product-price.dto");

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

    const list = async () => {
        try {
            const productWithPrice = [];
            const products =  await product.findAll({
                include: {
                    model: productPrice,
                    where: {
                        isActive: true
                    }
                }
            });
            for (let i = 0; i < products.length; i++) {
                productWithPrice.push(ProductPriceDto(products, i));
            }
            return productWithPrice;
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
            return await Product(db).destroy({where: {id: id}});
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
            await productPrice.update({price: payload.productPrice, mstProductId: updateProduct.id, isActive: payload.isActive}, {
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