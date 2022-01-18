const Comment = require("../models/Comment");

exports.createComment = (req, res, next) => {
  const comment = {
    user_id: req.body.userId,
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

exports.checkPreviousComment = (req, res, next) => {
  id = req.params.id;

  try {
    Comment.findOne({ where: { id: id } })
      .then((comment) => {
        if (!comment) {
          throw "Ce commentaire n'existe pas !";
        }
        if (
          req.auth.userId !== comment.user_id &&
          req.auth.isAdmin === false
        ) {
          throw "Requête non autorisée";
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(404).json(error);
      });
  } catch (error) {
    res.status(401).json({ error: error || "Cette action est impossible" });
  }
};

exports.modifyComment = (req, res, next) => {
  id = req.params.id;
  Comment.update(
    { text: req.body.text },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => res.status(200).send("Commentaire mis à jour !"))
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  id = req.params.id;
  Comment.destroy({
    where: {
      id: id,
    },
  })
    .then(() => res.status(200).send("Commentaire supprimé !"))
    .catch((error) => res.status(404).json({ error }));
};
