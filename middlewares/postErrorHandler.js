const utils = require('../utils.js')


module.exports = (err, req, res, next) => {
    let htmlContent = utils.readFile('posts', 'html');
    const errorMessage = err.message;
    const errorList = err.list || [];

    const formattedErrors = errorList.map(error => {
        return `<li class="text-red-500 font-semibold">${error}</li>`;
    }).join('');
    htmlContent = htmlContent.replaceAll('{{formErrors}}', formattedErrors)
    res.status(500).json({
        list: errorList,
        message: errorMessage
    });
}