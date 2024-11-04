const userDB = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchErrors');
const GeneratorNewToken = require('./CreateToken');

/*
log in Notes:

1) at the first you receive the data from the request body which is the email and the password ✅

2) then you should if there are has a value or not ✅

3) search for the user in the database using the email ✅

4) then you should decode the password and compare it with the password in the database ✅
    - at this step we will create a method in the schema to compare the passwords ✅
    - by using the compare method in the bcryptjs library we can compare the passwords ✅
5) if the password is correct you should create a new token for the user and send it to the client side ✅
 */

exports.log_in = catchAsync(async (request, response, next) => {
    console.log(request.body);

    // 1) receive the data from the request body
    const {email, password} = request.body;

    // 2) check if the email and the password have a value or not
    if (!email || !password) return next(new AppError('Please provide the email and the password', 400));

    // 3) search for the user in the database using the email
    const user = await userDB.findOne({email});
    console.log(user)
    if (!user) return next(new AppError('User not found please sign up', 404));

    // Now it is the time to compare the passwords
    if (await user.authenticate_password(password, user.password) === false) return next(new AppError('Password or email is incorrect', 401));

    await GeneratorNewToken(user, 200, response);
});