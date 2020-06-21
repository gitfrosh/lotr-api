// api/users/util/userFunctions.js

"use strict";

const Boom = require("boom");

async function preProcessNewUser(payload, mongoose) {
  // Before the route handler runs, verify that the user is unique
  // console.log(payload);
  const query = {
    email: payload.email.toLowerCase()
  };

  // var UserDetails = mongoose.model("user", User);
  var User = mongoose.model("user", User);

  let mongooseQuery = User.findOne(query);

  let user = await mongooseQuery.lean();
  if (user) {
      throw Boom.badRequest(
        "Sorry, this e-mail address is already registered."
      );
  } else {
    // console.log(user);
    // If everything checks out, send the payload through
    // to the route handler
    let hashedPassword = mongoose
      .model("user")
      .generatePasswordHash(payload.password);

    payload.password = hashedPassword;

    return payload;
  }
}

module.exports = {
  preProcessNewUser: preProcessNewUser
};
