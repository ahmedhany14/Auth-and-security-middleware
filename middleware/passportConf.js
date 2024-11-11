const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const { verify_callback_function } = require('../middleware/verify_CB');
const user = require('../models/userModel');
// the serialize used to store the user id in the session, to be used later in the deserialize
passport.serializeUser((user, next) => {
    next(null, user.id);
})

// this function will be called when the user make a request to the server, to get the user data from the session
passport.deserializeUser((id, next) => {
    user.findById(id)
        .then((user) => {
            next(null, user)
        }).catch((error) => {
            next(error, null)
        });
})

const GoogleStrategyOptions = {
    // options for the google strategy
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/authApi/google_redirect',
    scope: ['email']
}

passport.use(new GoogleStrategy(GoogleStrategyOptions, verify_callback_function));

module.exports = passport;