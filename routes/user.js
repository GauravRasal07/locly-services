const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Service = require("../models/service");
const Appointment = require("../models/appointment");
const middleware = require("../middleware/index");
const passport = require("passport");

//-----------Landing Page--------------
router.get("/", (req, res) => {
  res.render("landing-page");
});

//-----------Register Route--------------
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register/consumer", (req, res) => {
  // let data = req.sanitize(req.body);
  // return console.log(req.body);
  let data = req.body;
  if (data.password === data.confirm_pass) {
    let newUser = new User({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
    });
    User.register(newUser, data.password, (err, user) => {
      if (err) {
        // req.flash("error", err.message);
        console.log(err);
        res.send({ message: err.message });
      } else {
        req.flash(
          "success",
          "Successfully registered, Login with your credentials!"
        );
        res.send({
          success: true,
          message: "Successfully registered, Login with your credentials!",
        });
      }
    });
  } else {
    // req.flash("error", "Both password fields must match!");
    res.send({ message: "Something went wrong!" });
  }
});

router.post("/register/provider", (req, res) => {
  let data = req.body;
  // return console.log(req.body);
  if (data.password === data.confirm_pass) {
    let newUser = new User({
      username: data.username,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
    });
    User.register(newUser, data.password, (err, user) => {
      if (err) {
        // req.flash("error", "Something went wrong, Try again later!");
        console.log(err);
        res.send({ message: err.message });
      } else {
        let provider = {
          serviceType: data.serviceType,
          basicCharges: data.basicCharges,
          area: data.area,
          description: data.description,
          provider: data.firstName + " " + data.lastName,
          providerId: user._id,
        };
        // console.log(provider);
        Service.create(provider, (err, service) => {
          if (err) {
            // req.flash("error", "Something went wrong, Try again later!");
            console.log(err);
            res.send({ message: err.message });
          } else {
            user.serviceId = service;
            user.serviceProvider = true;
            user.save();

            req.flash(
              "success",
              "Successfully registered, Login with your credentials!"
            );
            res.send({
              success: true,
              message: "Successfully registered, Login with your credentials!",
            });
          }
        });
      }
    });
  } else {
    // req.flash("error", "Password not verified!");
    res.send({ message: "Something went wrong!" });
  }
});

//----------------Login routes------------------
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/services",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

//----------------Logout route--------------------
router.get("/logout", (req, res) => {
  // req.flash("success", "Logged out!");
  req.logout();
  res.redirect("/");
});

router.delete("/user/:id", (req, res) => {
  User.findByIdAndRemove(req.params.id, (err) => {
    if (err) {
      req.flash("error", "Something went wrong, Try again later!");
      res.redirect("back");
    } else {
      req.flash("warning", `Account deleted successfully!`);
      res.redirect("/");
    }
  });
});

//------------------service routes-----------------------
router.get("/services", middleware.isLoggedIn, async (req, res) => {
  if (req.user.serviceProvider) {
    const user = req.user;
    const appointments = await Appointment.find({ providerId: user._id });

    res.render("provider-dashboard", { appointments });
  } else {
    Service.find({}, (err, services) => {
      res.render("services", { services });
    });
  }
  // console.log("Heyyy, Middleware is not working");
  // res.render("services");
});

module.exports = router;

//----------------Appointment Booking Route --------------------
router.post("/bookAppointment/:pid/:uid", async (req, res) => {
  const providerId = req.params.pid;
  const userId = req.params.uid;
  const appData = new Appointment(req.body);

  try {
    let result = await appData.save();
    result["providerId"] = providerId;
    result["userId"] = userId;
    result = await result.save();

    let provider = await User.findById(providerId);
    provider.appointments = [...provider.appointments, result];
    provider = await provider.save();

    let user = await User.findById(userId);
    user.appointments = [...user.appointments, result];
    user = await user.save();

    res.send({ user: "Success" });
  } catch (err) {
    console.log(err);
    res.send({ errors: "Error Occurred" });
  }
});

router.get("/appointments/:userId", (req, res) => {
  User.findById(req.params.userId)
    .populate("appointments")
    .exec((err, user) => {
      if (err) {
        res.status(404).send("Something went wrong!!!");
      } else {
        res.render("cus_appointments", { appointments: user.appointments });
      }
    });
});

//----------------Jon Done Status Update Route --------------------

router.put("/appointments/:appId", async (req, res) => {
  try {
    const result = await Appointment.findByIdAndUpdate(req.params.appId, {
      is_done: true,
    });
    res.send({ user: "Success" });
  } catch (err) {
    console.log(err);
    res.send({ errors: "Error Occurred" });
  }
});
