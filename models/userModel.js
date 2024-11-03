const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: [validator.isEmail, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    confirmPassword: {
        type: String,
        required: [true, "Confirm Password is required"],
        validate: {
            validator: function (pass) {
                return pass === this.password;
            },
            message: "Passwords do not match, try again"
        }
    },
    passwordChangedAt: {
        type: Date,
        default: undefined
    }
});


const UserCOllection = mongoose.model("User", userSchema);

module.exports = UserCOllection;