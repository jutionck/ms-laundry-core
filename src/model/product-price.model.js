const {DataTypes} = require('sequelize');
const MST_PRODUCT_PRICE = 'mst_product_price';
module.exports = (db) => {
    return db.define(MST_PRODUCT_PRICE, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        price: DataTypes.BIGINT,
        isActive: DataTypes.BOOLEAN
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true
    })
}