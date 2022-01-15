const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controllers");

const auth = require("../middlewares/auth.middlewares");

router.get("/", auth, commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComment);
//router.get("/:id", auth, commentCtrl.getOneComment);
router.put("/:id", auth, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
