const catchAsync = require('../utils/catchErrors');
const AppError = require('../utils/appError');
const User = require('../models/userModel');

/*
Step to custom temporary token:

1) get the email from the request body ✅

2) search for the user in the database using the email ✅
    - if the user is not found return an error message ✅

3) create a new token for the user and save it in the database
    - create a method in the schema to create a new token ✅
    - use crypto library to create a random token with random bytes 32 and convert it to hex ✅
    - then hash the token with the sha256 algorithm and convert it to hex and save it in the database ✅
    - return the original token to the client side ✅

4) finish middleware by calling the next function ✅

*/

exports.customTemporaryToken = catchAsync(async (request, response, next) => {
    const {email} = request.body;
    const user = await User.findOne({email : email});

    if (!user) return next(new AppError('User not found please sign up', 404));

    const token = await user.createPasswordResetToken();

    request.token = token;
    return next();
})