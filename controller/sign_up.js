const userDB = require('./../models/userModel');
const catchAsync = require('./../utils/catchErrors');
const jwt = require('jsonwebtoken');
const GeneratorNewToken = require('./CreateToken');
/*
sign up Notes:

1) at the first you receive the data from the request body ✅

2) then you create a new user in the database and then wait for the database validations ✅

3) security note: 
    1- you should not send the password to the client side ✅
    2- you should hash the password before sending it to the client side, you will do this using a schma meddileware and use the bcryptjs library ✅
    3- you should not send the confirmPassword to the client side and you will make it as undefined in the schema ✅

4) after creating the data successfully:
    1- you need to create a token for the user to use it in the authentication process and you will use the jsonwebtoken library ✅
    2- you will send the token to the client side to use it in the authentication process ✅
    3- it is important to send the token in the cookie to make the user stay logged in after the browser is closed ✅
*/

exports.sign_up = catchAsync(async (request, response, next) => {
    const { name, email, password, confirmPassword } = request.body;
    const user = await userDB.create({
        name,
        email,
        password,
        confirmPassword,
    });

    await GeneratorNewToken(user, 201, response);
});