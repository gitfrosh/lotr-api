const rateLimit = require('express-rate-limit');

const authLimiter = (options) => {
    return rateLimit({ ...options })
};
module.exports = authLimiter;