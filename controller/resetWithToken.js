const catchAsync = require('../utils/catchErrors');
const AppError = require('../utils/appError');
const User = require('../models/userModel');
const crypto = require('crypto');
/*
How to check if the token is valid or not:

1) at the first you should have a token in the request object ✅

2) reHash the token to check if it is valid or not ✅
    - After rehashing the token, search for the user in the database using the token ✅
    - then check if the token is expired or not ✅

4) reset the password and confirmPassword from the request body, and remove the token from the database ✅
3) update the password in the database ✅


 */

exports.resetPassWithToken = catchAsync(async (request, response, next) => {
    const {token} = request.params;
    const {password, confirmPassword} = request.body;
    if (!password || !confirmPassword || password !== confirmPassword) return next(new AppError('Passwords do not match', 400));
    const decodedToken = crypto.createHash('sha256').update(token).digest('hex');

    if (!token) return next(new AppError('Token not found', 404));

    const user = await User.findOne({
        passwordResetToken: decodedToken,
        passwordResetExpires: {$gt: Date.now()}
    })

    console.log(decodedToken);

    if (!user) return next(new AppError('Token is invalid or expired', 400));

    user.password = password;
    user.confirmPassword = confirmPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save({
        validateBeforeSave: false
    })

    response.status(200).json({
        status: 'success',
        message: 'reset password please login again',
    })
})