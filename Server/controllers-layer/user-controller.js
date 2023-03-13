const bcrypt = require('bcryptjs');
const express = require("express");
const router = express.Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const userLogic = require("../business-logic-layer/user-logic");
const Credentials = require('../Middleware/Credentials');

dotenv.config();

//* POST route to handle new user register to the data base 
router.post("/register", async (request, response) => {
    try {
        const user = request.body;

        const salt = await bcrypt.genSalt(10);
        user.user_password = await bcrypt.hash(user.user_password, salt);

        const newUser = await userLogic.createNewUser(user);
        response.send({ success: true, user: newUser });
    }
    catch (error) {
        response.status(500).send(error ,{ success: false });
        console.log(error);
   
    }
});


//* POST route to handle user login
    router.post("/login", async (request, response) => {
        try {
            const credentials = new Credentials(request.body);
            const errors = credentials.validate();
            if (errors) return response.status(400).send(errors);

            const user = await userLogic.login(credentials);

            if (!user) return response.status(401).send("Incorrect username or password.");

            const token = jwt.sign({ user }, process.env.TOKEN_SECRET, { expiresIn: "30min" });
            response.header('Authorization', token).send({token});
        } catch (error) {
            response.status(500).send(error.message);
            console.log(error);
        }
    });

    router.get("/check/user/exists/:user_id/:user_email", async (request, response) => {
        try {
            const user_id = request.params.user_id;
            const user_email = request.params.user_email;
    
            const userIdExists = await userLogic.checkUserExists({ user_id });
            if (userIdExists) {
                return response.status(400).send({ error: "User ID already exists" });
            }
    
            const emailExists = await userLogic.checkUserExists({ user_email });
            if (emailExists) {
                return response.status(400).send({ error: "Email already exists" });
            }
    
            return response.send({ message: "User does not exist" });
        } catch (error) {
            console.log(error);
            return response.status(500).send({ error: "Internal server error" });
        }
    });

      



module.exports = router;