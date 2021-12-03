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

//Handling UNcaught exceptions
process.on('uncaughtException', err => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to uncaught exception");

  process.exit(1);
})


const DB_URI = 'mongodb+srv://LoclyUser:locly123@loclycluster.w92an.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose
  .connect(DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to Locly Database!"))

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
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  res.locals.warning = req.flash("warning");
  next();
});

app.use(require("./routes/user.js"));

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, function () {
  console.log("The Server is Listening!!!");
  console.log(`Visit here: http://localhost:${PORT}`);
});


//Handling the error caused by unhandled promise rejection
process.on('unhandledRejection', (err) => {
  console.log(`Error: ${err.message}`);
  console.log("Shutting down the server due to unhandled Promise Rejection");

  server.close(() => {
    process.exit(1);
  })
})