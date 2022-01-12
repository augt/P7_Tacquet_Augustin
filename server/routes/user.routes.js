const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");

router.post(
  "/signup",
  userCtrl.emailCheck,
  userCtrl.passwordCheck,
  userCtrl.signup
);

module.exports = router;
