const cartLogic = require("../business-logic-layer/cart-logic");
const express = require("express");
const router = express.Router();
const { authenticateUser } = require("../Middleware/verifyToken");
//TODO: ADD MIDDELWHERE IN EVRY ROUTE!!


router.get("/cart/:userId", authenticateUser, async (request, response) => {
    try {
        const userId = request.params.userId;
        const cart = await cartLogic.getCartByUserId(userId);
        response.status(200).send(cart);
    }
    catch (error) {
        response.status(500).send({ error: "Server Error" });
        console.log(error);
    }
});

router.post("/insert/new/cart", authenticateUser, async (request, response) => {
    try {
        const cart = request.body;
        const newCart = await cartLogic.postNewCartByUserId(cart);
        response.status(200).send(newCart);
    }
    catch (error) {
        response.status(500).send({ error: "Server Error" });
        console.log(error);
    }
});

router.delete("/cart/delete/:id", authenticateUser, async (request, response) => {
    try {
        const id = request.params.id;
        const deleteCart = await cartLogic.deleteCart(id);
        response.status(200).send(deleteCart);
    }

    catch (error) {
        response.status(500).send({ error: "Server Error" });
        console.log(error);
    }

})

module.exports = router;