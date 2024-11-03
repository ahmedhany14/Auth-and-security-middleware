const userDB = require('./../models/userModel');
const catchAsync = require('./../utils/catchErrors');
const jwt = require('jsonwebtoken');
/*
sign up Notes:

1) at the first you recive the data from the request body ✅

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

const tokenGenerator = async (id) => {
    // jwt have 3 methods: sign, verify, decode
    // to create a new token you should use the sign method to create a signature
    // sign method takes 2 parameters: the payload (id) and the secret key, and the options object like the expiration time
    const token = jwt.sign(
        { id },
        process.env.SECRET,
        { expiresIn: process.env.EXPIRATION }
    )

    return token;
}

const createToken = async (user, statusCode, response) => {
    // 1) create the token
    const token = await tokenGenerator(user._id);

    // 2) fill cookie options
    /*
        response cookie method takes 3 parameters:
        1- the name of the cookie
        2- the value of the cookie or token in this case
        3- the options object that contains the expiration time of the cookie and the secure option to make the cookie only available in the https protocol
    */
    const cookieOptions = {
        expiresIn: new Date(Date.now() + process.env.COOKIE_EXPIRATION * 60 * 60 * 1000),
        httpOnly: true
    }

    // send the cookie to the client side in the response
    response.cookie('jwt', token, cookieOptions);

    // 3) send the token to the client side and make password undefined to not send it to the client side
    user.password = undefined;
    response.status(statusCode).json({
        status: 'success',
        data: {
            token,
            user
        }
    });

}

exports.sign_up = catchAsync(async (request, response, next) => {
    const { name, email, password, confirmPassword } = request.body;
    const user = await userDB.create({
        name,
        email,
        password,
        confirmPassword,
    });

    await createToken(user, 201, response);
});