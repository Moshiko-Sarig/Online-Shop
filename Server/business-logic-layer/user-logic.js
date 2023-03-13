const bcrypt = require('bcryptjs');
const dal = require('../data-access-layer/dal');

async function createNewUser(user) {
    try {
        return await dal.executeQueryAsync(`
            INSERT INTO user 
            (user_id , user_first_name , user_last_name, user_email, user_password, user_city , user_street , user_is_admin)
            VALUES 
            ("${user.user_id}","${user.user_first_name}", "${user.user_last_name}", "${user.user_email}", "${user.user_password}", "${user.user_city}", "${user.user_street}" , "${user.user_is_admin = 0}" )
        `);
    } catch (error) {
        console.log(error);
    }
}


async function login(credentials) {
    try {

        const user = await dal.executeQueryAsync(
            `SELECT * from user where user_email = '${credentials.user_email}'`
        );

        if (!user || user.length < 1) return null;

        const hashedPassword = user[0].user_password;

        const isPasswordMatch = await bcrypt.compare(credentials.user_password, hashedPassword);

        if (!isPasswordMatch) return null;

        delete user[0].user_password;
        return user[0];

    } catch (error) {
        console.log(error);
    }
}

async function checkUserExists(user) {
    try {
        const userIdExists = await dal.executeQueryAsync(`SELECT user_id FROM user WHERE user_id = '${user.user_id}'`);
        if (userIdExists.length > 0) {
            return true;
        }

        const emailExists = await dal.executeQueryAsync(`
        SELECT user_email 
        FROM user 
        WHERE user_email = '${user.user_email}'`);
        if (emailExists.length > 0) {
            return true;
        }

        return false;
    } catch (error) {
        console.log(error);
    }
}







module.exports = {
    createNewUser,
    login,
    checkUserExists
}