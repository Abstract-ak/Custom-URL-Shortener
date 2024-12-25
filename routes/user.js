/* Define login and Signup routes */
const express = require("express");
const { handleUserSignUp } = require("../controllers/user");

const router = express.Router();

//signUp route
router.post("/", handleUserSignUp);

module.exports = router;
