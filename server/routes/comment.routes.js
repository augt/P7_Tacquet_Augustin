const express = require("express");
const router = express.Router();
const commentCtrl = require("../controllers/comment.controllers");

const auth = require("../middlewares/auth.middlewares");

router.get("/", auth, commentCtrl.getAllComments);
router.post("/", auth, commentCtrl.createComment);
router.put("/:id", auth, commentCtrl.checkPreviousComment, commentCtrl.modifyComment);
router.delete("/:id", auth, commentCtrl.checkPreviousComment, commentCtrl.deleteComment);

module.exports = router;
