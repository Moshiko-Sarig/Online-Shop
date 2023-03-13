const dal = require("../data-access-layer/dal");

async function getAllCartItem() {
    try {
        return await dal.executeQueryAsync("SELECT * FROM `cart_item` WHERE 1");
    }
    catch (error) {
        console.log(error);
    }
}

async function getCartItemById(cart_id) {
    try {
        return await dal.executeQueryAsync(`SELECT * FROM cart_item WHERE cart_id ="${cart_id}"`);
    }
    catch (error) {
        console.log(error);
    }
}

async function addNewCartItem(item) {
    try {
        return await dal.executeQueryAsync(`
        INSERT INTO cart_item 
        (cart_item_id, product_id, cart_item_price, general_price, cart_id) 
        VALUES 
        ("NULL", "${item.product_id}", "${item.cart_item_price}", "${item.general_price}", "${item.cart_id}")`);
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteCartItemByItemId(id) {
    try {
        return await dal.executeQueryAsync(`DELETE FROM cart_item WHERE cart_item.cart_item_id = "${id}"`);
    }
    catch (error) {
        console.log(error);
    }
}

async function deleteCartItems(cart_id) {
    try {
        return await dal.executeQueryAsync(`DELETE FROM cart_item WHERE cart_id = ${cart_id}`);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getAllCartItem,
    getCartItemById,
    addNewCartItem,
    deleteCartItemByItemId,
    deleteCartItems


}
