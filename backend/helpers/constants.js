const errorResponse = {
    success: false,
    message: "Something went wrong."
};

const notFoundResponse = {
    success: false,
    message: "Not found."
};

const HttpCode = Object.freeze({
    OK: 200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
});

module.exports = { errorResponse, notFoundResponse, HttpCode };