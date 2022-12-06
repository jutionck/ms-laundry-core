const Customer = require('../model/customer.model');
const Product = require('../model/product.model');
const ProductPrice = require('../model/product-price.model');
const Bill = require('../model/bill.model');
const BillDetail = require('../model/bill-detail.model');

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