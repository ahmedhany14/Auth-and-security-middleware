const User = require('../models/userModel');
const catchAsync = require('../utils/catchErrors');
const AppError = require('../utils/appError');

/*
Reset password middleware notes and steps:

3) when the user clicks on the link, we will verify the token and the email address.
    - check if the token is valid and not expired.
    - check if the password and confirm password are the same.
    - save the new password in the database.

4) create new token in the cookie

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
        user: request.user
    })
});