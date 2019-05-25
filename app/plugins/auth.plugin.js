const jwtSecret = "NeverShareYourSecret";
const strategy = "jwt";

module.exports = {
  plugin: {
    name: "auth",
    register
  },
  strategy
};

async function register(server, options) {
  await server.register(require("hapi-auth-jwt2"));

  const validate = (decodedToken, request, h) => {
    let { user } = decodedToken;
    if (!user) {
      return { isValid: false };
    }
    /* check for additional auth requirements if necessary */
    return {
      isValid: true,
      credentials: { user }
    };
  };

  server.auth.strategy(strategy, strategy, {
    key: jwtSecret,
    validate,
    verifyOptions: { algorithms: ["HS256"] }
  });

  // server.auth.default(strategy);

  server.method("createToken", createToken, {});
}

function createToken(user) {
  const Jwt = require("jsonwebtoken");

  const { email, _id, access_token } = user;

  token = Jwt.sign({ user: { email, _id, access_token } }, jwtSecret, {
    algorithm: "HS256",
    expiresIn: "1m"
  });

  return token;
}