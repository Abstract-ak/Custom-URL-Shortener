const { getuser } = require("../service/auth");

//handle user authentication middleware
async function restrictToLoggedinUserOnly(req, res, next) {
  const userId = req.cookies?.uid;
  if (!userId) return res.redirect("/");

  const user = getuser(userId);
  if (!user) return res.redirect("/");

  req.user = user;
  next();
}

module.exports = {
  restrictToLoggedinUserOnly,
};
