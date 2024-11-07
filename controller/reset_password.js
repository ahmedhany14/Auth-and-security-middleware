const User = require('../models/userModel');
const catchAsync = require('../utils/catchErrors');
const AppError = require('../utils/appError');

/*
Reset password middleware notes and steps:

1) at the first you should receive the password and the confirmPassword from the request body ✅
2) then you should check if the password and the confirmPassword have a value or not ✅
3) save the new password hashed in the database ✅
4) send a response to the client side with a message to login again ✅

*/

exports.reset = catchAsync(async (request, response, next) => {
    const {password, confirmPassword} = request.body;

    if(!password || !confirmPassword || password !== confirmPassword) return next(new AppError('Passwords do not match', 400));

    const user = new User(request.user);
    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordChangedAt = Date.now();
    await user.save({
        validateBeforeSave: false
    });

    response.status(200).json({
        status: 'success',
        message: 'reset password please login again',
    })
});