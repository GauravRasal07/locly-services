const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Provider = require("../models/serviceprovider");
const passport = require("passport");


//-----------Landing Page--------------
router.get("/", (req, res) => {
  res.render("landing-page");
});

//-----------Services --------------
router.get('/services',(req,res)=>{
  res.render("services");
})


//-----------Register Route--------------
router.get("/register", (req, res) => {
  res.render("register");
});

router.post("/register/consumer", (req, res) => {
  let data = req.body;
  if (data.password === data.confirm_pass) {
    let newUser = new User({
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
    });
    User.register(newUser, data.password, (err, user) => {
      if (err) {
        req.flash("error", "Something went wrong, Try again later!");
        res.redirect("back");
      } else {
        // passport.authenticate("local")(req, res, () => {
        //   req.flash("success", "Successfully registered as consumer!");
        //   res.render("home");
        // });
        res.send("Successfully Registered!!");
      }
    });
  } else {
    req.flash("err", "Check the password!!!");
    res.redirect("back");
  }
});

router.post("/register/provider", (req, res) => {
  let data = req.body;
  if (data.password === data.confirm_pass) {
    let newUser = new User({
      username: data.username,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      contactNumber: data.contactNumber,
      serviceProvider: true,
    });
    User.register(newUser, body.password, (err, user) => {
      if (err) {
        req.flash("error", "Something went wrong, Try again later!");
        res.redirect("back");
      } else {
        let provider = {
          serviceType: data.serviceType,
          area: data.area,
          basicCharges: data.basicCharges,
        };
        Provider.create(provider, (err, provider) => {
          if (err) {
            req.flash("error", "Something went wrong, Try again later!");
            res.redirect("back");
          } else {
            user.providerId = provider;
            user.save();
            passport.authenticate("local")(req, res, () => {
              req.flash(
                "success",
                "Successfully registered as Service Provider!"
              );
              res.render("home");
            });
          }
        });
      }
    });
  } else {
    req.flash("err", "Check the password!!!");
    res.redirect("back");
  }
});

//----------------Login routes------------------
router.get("/login", (req, res) => {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/home",
    failureRedirect: "/login",
    failureFlash: true,
  }),
  (req, res) => {}
);

//----------------Logout route--------------------
router.get("/logout", (req, res) => {
  req.flash("success", "Logged out!");
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

//------------------

module.exports = router;
