const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user.controllers");
const auth = require('../middlewares/auth.middlewares');

router.post(
  "/signup",
  userCtrl.emailCheck,
  userCtrl.passwordCheck,
  userCtrl.signup
);

router.post("/login", userCtrl.emailCheck, userCtrl.passwordCheck, userCtrl.login);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", auth, userCtrl.getAllUsers);
router.put("/:id", auth,userCtrl.emailCheck, userCtrl.passwordCheck,userCtrl.modifyUser);
router.delete("/:id",auth, userCtrl.deleteUser)


module.exports = router;

