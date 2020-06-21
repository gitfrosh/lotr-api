const passport = require("passport");
const User = require("./../models/user.model");
const secret = process.env.SECRET || "top_secret";
const jwt = require("jsonwebtoken");

module.exports = {
  login: async (req, res) => {
    const user = req.user;
      try {
        req.login(user, { session: false }, async (error) => {
          if (error) return res.send(error);
          const body = { id:user.id, email: user.email };
          const token = jwt.sign({ user: body }, secret);
          return res.json({
            token: token,
            email: user.email,
            access_token: user.access_token,
          });
        });
      } catch (e) {
        console.log(e);
        return res.sendStatus(500).send({
          success: false,
          message: "Login failed",
        });
      }
  },
  logout: function (req, res) {
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
    return res.json({
      success: true,
    });
  },
  register: function (req, res) {
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
