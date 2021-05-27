function authUser(req, res, next) {
  console.log(req);
  if (!req.user) {
    return res.status(403).send({ errorMessage: "you need to sign in" });
  }
  next();
}

function authRole(role) {
  return (req, res, next) => {
    if (req.user.userType !== role) {
      return res
        .status(401)
        .send({ errorMessage: "you don't have permission" });
    }
    next();
  };
}
module.exports = { authUser, authRole };
