const bcrypt = require("bcrypt-nodejs");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/User");

module.exports = (passport) => {
  passport.use(
    new localStrategy((username, password, done) => {
      User.findOne({ username, password }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (user.password !== password) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    User.findOne({ _id: user._id }, (err, user) => {
      done(err, user);
    });
  });
};
