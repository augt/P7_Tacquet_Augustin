const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication.controllers");

//const auth = require("../middleware/auth");
//const multer = require("../middleware/multer-config");

//router.get("/", auth, sauceCtrl.getAllSauces);
router.post("/",/*, auth, multer, */ publicationCtrl.createPublication);
//router.get("/:id", auth, sauceCtrl.getOneSauce);
//router.put("/:id", auth, multer, sauceCtrl.modifySauce);
//router.delete("/:id", auth, sauceCtrl.deleteSauce);
//router.post("/:id/like", auth, sauceCtrl.likeDislikeSauce);

module.exports = router;
