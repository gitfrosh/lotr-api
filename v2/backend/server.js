const db = require("./helpers/db");
const express = require("express");
const bcrypt = require("bcrypt");
const rateLimit = require("express-rate-limit");
const app = express();
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user.model");
const BearerStrategy = require('passport-http-bearer');
const cors = require('cors');

app.use(require("body-parser").json());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(cors());

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const server_port = process.env.PORT || 3001;

const apiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 15 minutes
  max: 100
});

passport.use(
  "bearer",
  new BearerStrategy(async (token, done) => {
    console.log(token)
    try {
      await User.findOne({ access_token: token }, async function (err, user) {
        console.log(err)
        if (err) {
          return done(err, false, { message: "Invalid token." });
        }
        if (!user) {
          return done(true, false, { message: "Invalid token." });
        }
        return done(null, token, { message: "Token valid." });
      });
    } catch (error) {
      done(error);
    }
  })
);

// prepare jwt login
passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    async (username, password, done) => {
      try {
        await User.findOne({ email: username }, async function (err, user) {
          if (err) {
            return done(err);
          }
          if (!user)
            return done(null, false, { message: "Incorrect username." });
          let passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) {
            return done(null, user, { message: "Logged in Successfully" });
          } else {
            return done(null, false, { message: "Incorrect password." });
          }
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

app.use("/v2/", apiLimiter);
app.use("/v2", apiRoutes);
app.use("/auth", authRoutes);

app.get("/", function (req, res) {
  res.send("Hello World!");
});

db.connectDb().then(async () => {
  app.listen(server_port, () =>
    console.log(`Example app listening on port ${server_port}!`)
  );
});
