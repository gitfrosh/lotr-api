const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 100,
    // skip limiter for special tokens (e.g. hackathons)
    // skip: function (req, res) {
    //   const token = req.header('authorization')?.split(' ')[1];
    //   if (dpwcToken === token) {
    //     return true
    //   }
    //   return false;
    // },
});

module.exports = apiLimiter;