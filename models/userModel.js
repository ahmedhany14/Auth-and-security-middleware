const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String, required: [true, "Name is required"]
    }, email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    }, password: {
        type: String, required: [true, "Password is required"]
    }, confirmPassword: {
        type: String, required: [true, "Confirm Password is required"], validate: {
            validator: function (pass) {
                return pass === this.password;
            }, message: "Passwords do not match, try again"
        }
    }, passwordChangedAt: {
        type: Date, default: undefined
    }, role: {
        type: String, enum: ['user', 'admin', 'super-admin'], required: [true, 'Role is required'],
    }
});


// middleware to hash the password before saving the user
userSchema.pre('save', async function (next) {
    console.log('hello from the middleware');
    // we should return next if the password is not modified, because use may save any data and not just the password
    if (this.isModified('password') === false) return next();

    // to hash the password we should use the bcrypt library
    this.password = await bcrypt.hash(this.password, 12);

    // we should delete the confirmPassword after hashing the password
    this.confirmPassword = undefined;
    next();
})

// schema method to compare the passwords
userSchema.methods.authenticate_password = async function (requestPassword, actualPassword) {
    return await bcrypt.compare(requestPassword, actualPassword);
}
userSchema.methods.compareTimeIfChanged = function (JWTTime) {
    if (this.passwordChangedAt === undefined) return false;

    // if this condition is true, then the password was changed after the token was created
    return JWTTime < this.passwordChangedAt.getTime();
}

const UserCOllection = mongoose.model("users", userSchema);

module.exports = UserCOllection;