const {DataTypes} = require('sequelize');
const TRX_BILL = 'trx_bill';
module.exports = (db) => {
    return db.define(TRX_BILL, {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        transDate: DataTypes.DATE,
    }, {
        freezeTableName: true,
        underscored: true,
        paranoid: true
    })
}