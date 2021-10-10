middleware = {};

middleware.isLoggedIn = (req, res, next) => {
  // console.log("Hitted");
  // next();
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash("error", "Please Login First!!!");
    res.redirect("/login");
  }
};

module.exports = middleware;
