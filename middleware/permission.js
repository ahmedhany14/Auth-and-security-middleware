const AppError = require('../utils/appError');

/*
The permission middleware is used to check if the user has the required permissions to access a certain route.

The process is very simple
- you will pass the roles you need
- then from the user data check if he belongs to one of these roles or not
 */

exports.PreventAccess = (...roles) => {
    return (request, response, next) => {
        return roles.includes(request.user.role) ? next() : next(new AppError('You do not have permission to access this route', 403));
    }
}