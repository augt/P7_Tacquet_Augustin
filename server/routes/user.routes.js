const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");
// const auth = require('../middleware/auth');

router.post(
  "/signup",
  userCtrl.emailCheck,
  userCtrl.passwordCheck,
  userCtrl.signup
);

//router.get("/login", userCtrl.emailCheck, userCtrl.passwordCheck, userCtrl.login);
router.get("/:id", /*auth,*/userCtrl.getOneUser);
//router.put("/:id", /*auth,*/userCtrl.emailCheck, userCtrl.passwordCheck,userCtrl.modifyUser);
//router.delete("/:id",/*auth,*/ userCtrl.deleteUser)


module.exports = router;

