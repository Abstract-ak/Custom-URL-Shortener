const User = require("../models/user");

async function handleUserSignUp(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
}

async function handleUserlogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  // console.log("user", user);
  if (!user) return res.render("login", { error: "Invalid Credentials!" });

  return res.redirect("/");
}

module.exports = {
  handleUserSignUp,
  handleUserlogin,
};
