const { request, response } = require("express");
const express = require("express");
const router = express.Router();
const cartItemLogic = require("../business-logic-layer/cart-item-logic");
const { authenticateUser } = require("../Middleware/verifyToken");







router.get("/allCartItem", async (request, response) => {
    try {
        const cartItems = await cartItemLogic.getAllCartItem();
        response.status(200).send(cartItems);
    }
    catch (error) {
        response.status(500).send({ error: "server Error!" });
        console.log(error);
    }
})

router.get("/cart/item/:cartId",authenticateUser, async (request, response) => {
    try {
        const cartId = request.params.cartId;
        const cartItem = await cartItemLogic.getCartItemById(cartId);
        response.status(200).send(cartItem);
    }
    catch (error) {
        response.status(500).send({ error: "server Error!" });
        console.log(error);
    }
});

router.post("/new/item",authenticateUser, async (request, response) => {
    try {
        const item = request.body;
        console.log(item);
        const newCartItem = await cartItemLogic.addNewCartItem(item);
        response.status(200).send(newCartItem);
    }
    catch (error) {
        response.status(500).send({ error: "server Error!" });
        console.log(error);

    }
});

router.delete("/delete/:id",authenticateUser, async (request, response) => {
    try {
        const id = request.params.id;
        const deleteItem = await cartItemLogic.deleteCartItemByItemId(id);
        response.send(deleteItem).status(200);
    }
    catch (error) {
        response.status(500).send({ error: "server Error!" });
        console.log(error);
    }
})


router.delete("/delete/all/items/:id",authenticateUser, async (request, response) => {
    try {
        const id = request.params.id;
        const deleteAllCartItems = await cartItemLogic.deleteCartItems(id)
        response.status(200).send(deleteAllCartItems);
    }

    catch (error) {
        response.status(500).send({ error: "Server Error" });
        console.log(error);
    }

})


module.exports = router;