const catchAsync = require('../utils/catchErrors')

exports.log_out = catchAsync(async (request, response, next) => {
    // clear the cookie from the client
    response.clearCookie('jwt');

    response.status(200).json({
        status: 'success',
        message: 'You are logged out'
    })
})