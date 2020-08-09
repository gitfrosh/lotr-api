const passport = require("passport");
const User = require("./../models/user.model");
const secret = process.env.SECRET || "top_secret";
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const user = req.user;
      try {
        req.login(user, { session: false }, async (error) => {
          if (error) return res.status(500).send(error);
          const body = { id:user.id, email: user.email, access_token: user.access_token };
          const token = jwt.sign({ user: body }, secret);
          return res.json({
            token: token,
            email: user.email,
            access_token: user.access_token,
          });
        });
      } catch (e) {
        console.log(e);
        return res.status(500).send({
          success: false,
          message: "Login failed",
        });
      }
  },
  register: function (req, res) {
    console.log(req.body)
    const {email, password} = req.body; 
    return res.json({
      success: true,
    });
  },
};

// server.get("/auth/logout", function (req, res) {

// });

// server.get("/auth/register", function (req, res) {
//   try {
//     req.logout();
//     return res.json({
//       success: true,
//     });
//   } catch (e) {
//     console.log(e);
//     return res.json({
//       success: false,
//       message: "Logout failed",
//     });
//   }
// });
