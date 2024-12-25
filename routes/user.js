/* Define login and Signup routes */
const express = require("express");
const { handleUserSignUp, handleUserlogin } = require("../controllers/user");

const router = express.Router();

//signUp route
router.post("/", handleUserSignUp);
router.post("/login", handleUserlogin);

module.exports = router;
