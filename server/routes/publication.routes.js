const express = require("express");
const router = express.Router();
const publicationCtrl = require("../controllers/publication.controllers");
const multer = require("../middlewares/multer-config.middlewares");

const auth = require("../middlewares/auth.middlewares");


router.get("/", auth, publicationCtrl.getAllPublications);
router.post("/", auth, multer, publicationCtrl.createPublication);
router.put("/:id", auth, multer, publicationCtrl.checkPreviousPublication ,publicationCtrl.modifyPublication);
router.delete("/:id", auth, publicationCtrl.checkPreviousPublication, publicationCtrl.deletePublication);

module.exports = router;
