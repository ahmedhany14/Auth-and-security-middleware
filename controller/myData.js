const userDb = require('../models/userModel');
const jwt = require('jsonwebtoken');
const catchAsync = require('./../utils/catchErrors');
const AppError = require('./../utils/appError');

exports.me = catchAsync(async (request, response, next) => {
    response.status(200).json({
        status: 'success', message: 'Hello from the me route', data: {
            user: request.user
        }
    })
})

exports.userData = catchAsync(async (request, response, next) => {
    const id = request.params.id;
    const user = await userDb.findById(id);
    if (!user) return next(new AppError('User not found', 404));
    response.status(200).json({
        status: 'success', message: 'User data', data: {
            user
        }
    })
})