const user = require('./../models/userModel');


exports.verify_callback_function = async (accessToken, refreshToken, profile, next) => {
    // this function will be called after the user login with google, in which it can used as a middleware to handle the user data
    console.log(profile);
    const email = profile.emails[0].value;
    const name = profile.displayName || email.split('@')[0];
    let userExist = await user.findOne({ email: email })
    const error = null;
    if (userExist === null) {
        userExist = new user({
            name: name,
            email: email
        });
        await userExist.save({
            validateBeforeSave: false
        });
    }
    console.log('passport callback function fired');
    next(error, userExist);
}