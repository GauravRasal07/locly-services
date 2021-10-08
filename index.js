const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const flash = require("connect-flash");
const expressSanitizer = require("express-sanitizer");
const methodOverRide = require("method-override");
const localStrategy = require("passport-local");
const User = require("./models/user");
const dotenv = require("dotenv").config();
const app = express();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Locly Database!"))
  .catch((error) => console.log(error.message));

app.use(
  require("express-session")({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false,
  })
);

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

app.use(expressSanitizer());

app.use(flash());

app.use(express.static(__dirname + "/public"));

app.use(methodOverRide("_method"));

passport.use(new localStrategy(User.authenticate()));

app.use(passport.initialize());

app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use(require("./routes/user.js"));

app.listen(process.env.PORT || 3000, function () {
  console.log("The Server is Listening!!!");
});
