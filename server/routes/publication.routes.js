const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication.controllers");
const multer = require("../middlewares/multer-config.middlewares");

//const auth = require("../middleware/auth");


router.get("/", /*auth,*/ publicationCtrl.getAllPublications);
router.post("/",/* auth,*/ multer, publicationCtrl.createPublication);
//router.get("/:id", auth, publicationCtrl.getOnePublication);
//router.put("/:id", auth, multer, publicationCtrl.modifyPublication);
//router.delete("/:id", auth, publicationCtrl.deletePublication);

module.exports = router;
