const passport = require("passport");

module.exports = {
  authenticate: async (req, res, next) => {
    passport.authenticate("bearer", { session: false }, async function (
      err,
      token,
    ) {
      try {
        if (err || !token) {
          return res.status(401).send({
            success: false,
            message: "Unauthorized.",
          });
        } else {
        }
        next();
      } catch (err) {
        console.log(err);
      }
    })(req, res, next);
  },

  login: async (req, res, next) => {
    passport.authenticate("login", async function (err, user, info) {
      try {
        if (err || !user) {
          return res.status(401).send({
            success: false,
            message: (info && info.message) || "Unauthorized",
          });
        } else {
          req.user = user;
          next();
        }
     
      } catch (err) {
        console.log(err);
      }
    })(req, res, next);
  },
};
