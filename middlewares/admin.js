const CustomError = require('../models/customError');

module.exports = (req, res, next) => {

    const user = req.user;
    if (!req.user) {
        throw new CustomError('Could not find user', 500)
    }

    const users = require('../db/users.json');
    const userToCheck = users.find(u => u.id === user.id);

    if (!userToCheck) {
        throw new CustomError('Could not find user', 500)
    }


    if (!userToCheck.admin) {
        throw new CustomError('Only admin users can perform this action', 401)
    }

    next()
}