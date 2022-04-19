const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const User = require("../schemas/user");

module.exports = function (passport) {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        const user = await User.findOne({ email: email });
        if (!user) {
          done(null, false);
        } else {
          bcrypt.compare(password, user.password, (err, isMatched) => {
            if (isMatched) {
              done(null, user);
            } else {
              done(null, false);
            }
          });
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });
};
