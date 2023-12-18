const rateLimit = require('express-rate-limit');

export const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100,
    message: {
        success: false,
        message: "Too many requests, please try again later."
    }
    // skip limiter for special tokens (e.gs. hackathons)
    // skip: function (req, res) {
    //   const token = req.header('authorization')?.split(' ')[1];
    //   if (dpwcToken === token) {
    //     return true
    //   }
    //   return false;
    // },
});