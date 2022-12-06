const ProductDto = (products, index) => {
    if (products[index]) {
        console.log('here')
        const {id, price, isActive} = products[index].mst_product_prices[0];
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
    const {id, price, isActive} = products.mst_product_prices[0];
    return {
        id: products.id,
        name: products.name,
        duration: products.duration,
        productPrice: {
            id: id,
            price: Number(price),
            isActive: isActive
        },
        createdAt: products.createdAt,
        updatedAt: products.updatedAt,
        deletedAt: products.deletedAt,
    }
}

module.exports = ProductDto;