const dal = require('../data-access-layer/dal');

async function getAllProducts() {
    try {
        return await dal.executeQueryAsync(`SELECT * FROM product WHERE 1`);
    }
    catch (error) {
        console.log(error);
    }
}

async function getProductByCategory(category_id) {
    try {
        return await dal.executeQueryAsync(`
        SELECT * FROM product WHERE category_id =${category_id}`);
    }
    catch (error) {
        console.log(error);
    }
}

async function getProductByName(product_name) {
    try {
        return await dal.executeQueryAsync(`
        SELECT * FROM product WHERE product_name LIKE CONCAT('%', "${product_name}", '%')`);
    }
    catch (error) {
        console.log(error);
    }
}


async function creatNewProduct(product) {
    try {

        return await dal.executeQueryAsync(`
        INSERT INTO product (product_id, product_name, category_id, product_price, product_picture)
        VALUES 
        (NULL, '${product.product_name}', '${product.category_id}', '${product.product_price}', '${product.product_picture}')`
        );
    }
    catch (error) {
        console.log(error);
    }
}

async function editProduct(product, id) {
    try {
        return await dal.executeQueryAsync(`
        UPDATE product 
        SET 
        product_name="${product.product_name}",
        product_price= "${product.product_price}",
        product_picture="${product.product_picture}"
        WHERE 
        product_id = ${id}
        `);

    }
    catch (error) {
        console.log(error);
    }
}

async function getProductByProductId(product_id) {
    try {
        return dal.executeQueryAsync(`SELECT * FROM product WHERE product_id =${product_id}`)
    }
    catch (error) {
        console.log(error);
    }
}


module.exports = {
    getProductByCategory,
    getProductByName,
    getAllProducts,
    creatNewProduct,
    editProduct,
    getProductByProductId
}