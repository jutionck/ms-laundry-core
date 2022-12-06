const Customer = require('../model/entity/customer.model');
const Product = require('../model/entity/product.model');
const ProductPrice = require('../model/entity/product-price.model');
const Bill = require('../model/entity/bill.model');
const BillDetail = require('../model/entity/bill-detail.model');

const DbMigration = async (db) => {
    const customer = Customer(db);
    const product = Product(db);
    const productPrice = ProductPrice(db);
    const bill = Bill(db);
    const billDetail = BillDetail(db);

    // relations
    product.hasMany(productPrice);
    customer.hasMany(bill);
    product.hasMany(billDetail);
    bill.hasMany(billDetail);

    await db.sync();
}

module.exports = DbMigration;