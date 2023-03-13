const express = require("express");
const cors = require("cors");
const server = express();

//* Import all controllers
const categoryController = require("./controllers-layer/category-controller");
const prodcutController = require("./controllers-layer/product-controller");
const orderController = require("./controllers-layer/order-controller");
const userController = require("./controllers-layer/user-controller");
const cartItemController = require("./controllers-layer/cart-item-controller");
const cartController = require("./controllers-layer/cart-controller");

//* Use the CORS middleware to allow cross-origin requests
server.use(cors());

//* Use the JSON middleware to parse incoming JSON request bodies
server.use(express.json());

//* Use all the controllers in the server routes
server.use("/api", categoryController);
server.use("/api", prodcutController);
server.use("/api", orderController);
server.use("/api", userController);
server.use("/api", cartItemController);
server.use("/api", cartController);

//* Handle all other requests with a 404 error
server.use("*", (req, res) => {
    res.status(404).send(`Route not found ${req.originalUrl}`);
});

//* Start the server on the specified port, and log a message upon success
server.listen(process.env.APP_PORT, () => {
    console.log("Server is listening on port:", process.env.APP_PORT);
}).on("error", (err) => {
    console.log(err);
    if (err.code === "EADDRINUSE") {
        console.log("Error: Address in use");
    } else {
        console.log("Error: Unknown error");
    }
});
