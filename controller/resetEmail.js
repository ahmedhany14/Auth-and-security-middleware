const catchAsync = require('../utils/catchErrors');
const AppError = require('../utils/appError');
const User = require('../models/userModel');


/*
1) at the first you should have a token in the request object ✅
2) i will create a new message to send it to the user email to reset the password ✅
3) the message will contain the token to reset the password ✅
4) send a response to the client side with a message to check the email ✅

 */

exports.linkToResetPassword = catchAsync(async (request, response, next) => {

    const message = `Please click on the link to reset the password http://localhost:3000/reset_password/${request.token}`;

    response.status(200).json({
        status: 'success',
        message: message,
    })
})