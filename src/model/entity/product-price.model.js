const {DataTypes} = require('sequelize');
const Product = require('./product.model');
const MST_PRODUCT_PRICE = 'mst_product_price';
module.exports = (db) => {
    return db.define(MST_PRODUCT_PRICE, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        price: DataTypes.BIGINT,
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        mstProductId: {
            type: DataTypes.UUID,
            references: {
                model: Product(db),
                key: 'id'
            }
        }
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true
    });
}