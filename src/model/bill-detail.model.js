const {DataTypes} = require('sequelize');
const TRX_BILL_DETAIL = 'trx_bill_detail';
module.exports = (db) => {
    return db.define(TRX_BILL_DETAIL, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        weight: DataTypes.BIGINT
    })
}