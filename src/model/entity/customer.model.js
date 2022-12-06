const {DataTypes} = require('sequelize');
const MST_CUSTOMER = 'mst_customer';
module.exports = (db) => {
    return db.define(MST_CUSTOMER, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: DataTypes.STRING(30),
        phoneNumber: DataTypes.STRING(16)
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true
    })
}