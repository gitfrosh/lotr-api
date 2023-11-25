require("dotenv").config();
const db = require("./helpers/db");
const express = require("express");
const bcrypt = require("bcrypt");
const passport = require("passport");
const apiLimiter = require("./middleware/api.limiter");
const localStrategy = require("passport-local").Strategy;
const User = require("./models/user.model");
const BearerStrategy = require("passport-http-bearer");
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const dpwcToken = process.env.DPWC_TOKEN || "";

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(express.static(path.join(__dirname, "/__BUILD"))); // React build

const apiRoutes = require("./routes/api");
const authRoutes = require("./routes/auth");

const server_port = process.env.PORT || 3001;

passport.use(
  "bearer",
  new BearerStrategy(async (token, done) => {
    try {
      if (dpwcToken === token) {
        return done(null, token, { message: "Token valid." });
      }
      await User.findOne({ access_token: token }, async function (err, user) {
        console.log(err);
        if (err) {
          return done(err, false, { message: "Invalid token." });
        }
        if (!user) {
          return done(err, false, { message: "Wrong token." });
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

app.use((req, res, next) => {
  const path = req.path;
  if (path.startsWith("/v2") || path.startsWith("/auth")) {
    const connected = mongoose.connection.readyState === 1 ? true : false;
    if (connected) {
      next();
    } else {
      return res.status(500).send({
        success: false,
        message: "Service currently not available.",
      });
    }
  } else {
    next();
  }
});

app.use("/v2/", apiLimiter);
app.use("/v2", apiRoutes);
app.use("/auth", authRoutes);

// Handles React frontend requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/__BUILD/index.html"));
});

async function start() {
  await db.connectDb();
  app.listen(server_port, () =>
    console.log(`LotR backend listening on port ${server_port}!`)
  );
}

start();
