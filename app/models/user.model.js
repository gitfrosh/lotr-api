const bcrypt = require("bcryptjs");

module.exports = function(mongoose) {
  let modelName = "user";
  let Types = mongoose.Schema.Types;
  let Schema = new mongoose.Schema({
    email: {
      type: Types.String,
      unique: true
    },
    password: {
      type: Types.String,
      required: true,
      exclude: true,
      allowOnUpdate: false
    }
  });

  Schema.statics = {
    collectionName: modelName,
    routeOptions: {
      create: {
        pre: function(payload, logger) {
          let hashedPassword = mongoose
            .model("user")
            .generatePasswordHash(payload.password);

          payload.password = hashedPassword;

          return payload;
        }
      }
    },

    generatePasswordHash: function(password) {
      let hash = password;
      let salt = bcrypt.genSaltSync(10);
      hash = bcrypt.hashSync(password, salt);
      return hash;
    },

    findByCredentials: async function(email, password) {
      const self = this;

      const query = {
        email: email.toLowerCase()
      };

      let mongooseQuery = self.findOne(query);

      let user = await mongooseQuery.lean();

      if (!user) {
        return false;
      }

      const source = user.password;

      let passwordMatch = await bcrypt.compare(password, source);
      if (passwordMatch) {
        return user;
      } else {
        return false;
      }
    }
  };

  return Schema;
};
