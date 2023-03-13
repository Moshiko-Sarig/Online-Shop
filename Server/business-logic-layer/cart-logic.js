const dal = require('../data-access-layer/dal');

async function getCartByUserId(user_id) {
    try {
        return await dal.executeQueryAsync(`SELECT * FROM shopping_cart WHERE user_id="${user_id}"`);
    }
    catch (error) {
        console.log(error);
    }
}

async function postNewCartByUserId(shopping_cart) {
    try {
        const existingCart = await dal.executeQueryAsync(`
            SELECT * FROM shopping_cart
            WHERE user_id = "${shopping_cart.user_id}"
        `);

        if (existingCart.length > 0) {
            return { error: 'A cart already exists for this user' };
        }

        return await dal.executeQueryAsync(`
            INSERT INTO
            shopping_cart (cart_id, user_id, cart_creation_date) 
            VALUES 
            (DEFAULT, "${shopping_cart.user_id}", '${shopping_cart.cart_creation_date}')
        `);
    } catch (error) {
        console.log(error);
        return { error: 'An error occurred while creating the cart' };
    }
}


async function deleteCart(cart_id) {
    try {
        return await dal.executeQueryAsync(`DELETE FROM shopping_cart WHERE cart_id = ${cart_id}`);
    } catch (error) {
        console.log(error);
    }
}


module.exports = {
    getCartByUserId,
    postNewCartByUserId,
    deleteCart


}