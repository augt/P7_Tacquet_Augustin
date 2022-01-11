const Comment = require("../models/Comment");

exports.createComment = (req, res, next) => {
  const comment = {
    commenter_id: req.body.commenterId,
    originalPublication_id: req.body.originalPublicationId,
    text: req.body.text,
  };
  Comment.create(comment)
    .then(() => res.status(201).json({ message: "Commentaire créé !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll()
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).json({ error }));
};
