const express = require("express");
const categoryLogic = require("../business-logic-layer/category-logic");
const router = express.Router();
const { authenticateUser, authorizeAdmin } = require("../Middleware/verifyToken");



//**!!TODO: ADD MIDDELWHERE IN EVRY ROUTE!!**!!

router.get("/categorys",authenticateUser ,async (request, response) => {
    try {
        //* Get all categories using categoryLogic
        const category = await categoryLogic.getAllCategorys();
        response.status(200).send(category);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});


router.post("/add/new/:category",authorizeAdmin, async (request, response) => {
    try {
        const category = request.body;
        const newCategory = categoryLogic.addNewCategory(category);
        response.status(200).send(newCategory);
    } catch (error) {
        console.log(error);

        response.status(500).send({ message: "Server error!" });
    }
});


module.exports = router;