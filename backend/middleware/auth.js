function checkAuthenticated(req, res, next) {
  console.log("checkAuthenticated");
  if (req.isAuthenticated()) {
    console.log("Authenticated");

    return next();
  }
  console.log("Not Authenticated");

  res.redirect("/notloggedin");
}

function checkNotAuthenticated(req, res, next) {
  console.log("check Not Authenticated");

  if (req.isAuthenticated()) {
    console.log("Authenticated");
    return res.redirect("/loggedin");
  }
  console.log("Not Authenticated");
  next();
}

module.exports = { checkAuthenticated, checkNotAuthenticated };
