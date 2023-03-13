const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const orderLogic = require("../business-logic-layer/order-logic")
const { authenticateUser} = require("../Middleware/verifyToken");

router.get("/orders", async (request, response) => {
    try {
        const orders = await orderLogic.getAllOrders();
        response.status(200).send(orders);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});

router.get("/order/:user_id",authenticateUser, async (request, response) => {
    try {
        const user_id = request.params.user_id;
        const order = await orderLogic.getOrderByUserId(user_id);
        response.status(200).send(order);

    }

    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});

router.post("/post/new/order",authenticateUser, async (request, response) => {
    try {
        const order = request.body;
        const ordersByDate = await orderLogic.getOrdersByDate(order.date_for_delivery);
        console.log(ordersByDate);
        if (ordersByDate.length > 3)
            response.status(400).send({ message: "the date that you chose is occupied" });
        else {
            const newOrder = await orderLogic.createNewOrder(order);
            response.status(200).send(newOrder);
        }
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }

});

module.exports = router;