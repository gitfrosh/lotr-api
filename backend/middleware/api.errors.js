const { HttpCode, errorResponse } = require("../helpers/constants")

const errorHandler = (err, req, res, next) => {
    res.status(HttpCode.SERVER_ERROR).send(errorResponse)
}

module.exports = errorHandler