const dal = require('../data-access-layer/dal');


async function getAllCategorys() {
    try {
        return await dal.executeQueryAsync("SELECT * FROM `product_category` WHERE 1");
    } catch (error) {

        console.log(error);
    }
}


async function addNewCategory(category_name) {
    try {
        return await dal.executeQueryAsync(`INSERT INTO product_category(category_id, category_name) VALUES(NULL, '${category_name}')`);
    } catch (error) {

        console.log(error);
    }
}


module.exports = {
    getAllCategorys,
    addNewCategory,
};