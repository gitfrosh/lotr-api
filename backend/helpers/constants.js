const errorResponse = {
    success: false,
    message: "Something went wrong."
};

const HttpCode = Object.freeze({
    OK: 200,
    SERVER_ERROR: 500
});

module.exports = { errorResponse, HttpCode };