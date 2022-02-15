const Comment = require("../models/Comment");
const User = require("../models/User");

Comment.belongsTo(User, { as: "user" });

exports.createComment = (req, res, next) => {
  const comment = {
    uuid: req.body.uuid,
    publicationId: req.body.publicationId,
    text: req.body.text,
    userId: req.auth.userId,
  };
  Comment.create(comment)
    .then((comment) => {
      res.status(201).json({
        message: "Commentaire créé !",
        id: comment.id,
        createdAt: comment.createdAt,
        updatedAt: comment.updatedAt,
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res, next) => {
  Comment.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
    attributes: [
      "id",
      "uuid",
      "text",
      "publicationId",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "ASC"]],
  })
    .then((comments) => res.status(200).json(comments))
    .catch((error) => res.status(404).json({ error }));
};

exports.checkPreviousComment = (req, res, next) => {
  id = req.params.id;

  try {
    Comment.findOne({ where: { id } })
      .then((comment) => {
        if (!comment) {
          throw "Ce commentaire n'existe pas !";
        }
        if (req.auth.uuid !== comment.uuid && req.auth.isAdmin === false) {
          throw "Requête non autorisée";
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(401).json(error);
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
        id,
      },
    }
  )
    .then(() => {
      return Comment.findOne({ where: { id } });
    })
    .then((comment) => {
      res.status(200).send({
        message: "Commentaire mis à jour !",
        text: comment.text,
        updatedAt: comment.updatedAt,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteComment = (req, res, next) => {
  id = req.params.id;
  Comment.destroy({
    where: {
      id,
    },
  })
    .then(() => res.status(200).send("Commentaire supprimé !"))
    .catch((error) => res.status(404).json({ error }));
};
