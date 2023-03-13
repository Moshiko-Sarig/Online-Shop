const { request, response } = require("express");
const express = require("express");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const path = require("path");
const router = express.Router();
const productLogic = require("../business-logic-layer/product-logic");
const { authenticateUser ,authorizeAdmin} = require("../Middleware/verifyToken");



//TODO: ADD MIDDELWHERE IN EVRY ROUTE!!


router.get("/images/:imageName", (request, response) => {
    const imageName = request.params.imageName;
    let imageAddres = path.join(__dirname, "..", "images", imageName);
    if (!fs.existsSync(imageAddres)) {
        imageAddres = path.join(__dirname, "..", "images", "Error: canot find image ");

    }
    response.sendFile(imageAddres);
});

router.get("/products", async (request, response) => {
    try {
        const allProducts = await productLogic.getAllProducts();
        response.status(200).send(allProducts);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });

    }

})

router.get("/get/product/by/product/:id",authenticateUser, async (request, response) => {
    try {
        const id = request.params.id;
        const product = await productLogic.getProductByProductId(id);
        response.send(product).status(200);

    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
})

router.get("/product/get/:name",authenticateUser, async (request, response) => {
    try {
        const name = request.params.name;
        const product = await productLogic.getProductByName(name);
        response.send(product);
    }
    catch (error) {
        console.log(error);
        response.status(500).send({ message: "Server error!" });
    }
});


router.get("/product/get/by/:id",authenticateUser, async (request, response) => {
    try {
        const id = request.params.id;
        const product = await productLogic.getProductByCategory(id);
        response.send(product);
    }
    catch (error) {
        response.status(500).send({ message: "Server error!" });
        console.log(error);
    }
});

router.use([fileUpload()]);

router.post("/addProduct",authenticateUser,authorizeAdmin, async (request, response) => {
    try {
        const newProduct = request.body;
        const image = request.files.product_picture;
        if (!image) {
            response.status(400).send({ message: "Error please send a image with the product" });
        }
        newProduct.product_picture = image.name
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath);
        const result = await productLogic.creatNewProduct(newProduct);
        response.status(200).send(result);
    }
    catch (err) {
        response.status(500).send({ message: "Error: Server Error" });
        console.log(err);
    }
});

router.patch("/upadteProduct/:id", authenticateUser,authorizeAdmin, async (request, response) => {
    try {
        const body = request.body;
        const id = request.params.id;
        const image = request.files.product_picture;
        if (!image) {
            response.status(400).send({ message: "Error please send a image with the Product" });
        }
        body.product_picture = image.name;
        const absolutePath = path.join(__dirname, "..", "images", image.name);
        await image.mv(absolutePath);
        const upadteProduct = await productLogic.editProduct(body, id);
        response.send(upadteProduct).status(200);
    }
    catch (err) {
        response.status(500).send({ message: "Server error!" });
        console.log(err);
    }

});


module.exports = router;