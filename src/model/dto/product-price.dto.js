const ProductPriceDto = (products, index) => {
    const { id, price, isActive } = products[index].mst_product_prices[0];
    return {
        id: products[index].id,
        name: products[index].name,
        duration: products[index].duration,
        productPrice: {
            id: id,
            price: Number(price),
            isActive: isActive
        },
        createdAt: products[index].createdAt,
        updatedAt: products[index].updatedAt,
        deletedAt: products[index].deletedAt,
    }
}

module.exports = ProductPriceDto;