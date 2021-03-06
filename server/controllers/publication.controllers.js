const Publication = require("../models/Publication");
const fs = require("fs");
const Comment = require("../models/Comment");
const User = require("../models/User");

Publication.hasMany(Comment, { onDelete: "CASCADE" }, { as: "comments" });
Publication.belongsTo(User, { as: "user" });

exports.createPublication = (req, res, next) => {
  if (req.file) {
    const publication = {
      uuid: req.body.uuid,
      text: req.body.text,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
      userId: req.auth.userId,
    };
    Publication.create(publication)
      .then((publication) => {
        res.status(201).json({
          message: "Publication créée !",
          id: publication.id,
          image: publication.image,
          createdAt: publication.createdAt,
          updatedAt: publication.updatedAt,
        });
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    const publication = {
      uuid: req.body.uuid,
      text: req.body.text,
      image: null,
      userId: req.auth.userId,
    };
    Publication.create(publication)
      .then((publication) => {
        res.status(201).json({
          message: "Publication créée !",
          id: publication.id,
          image: publication.image,
          createdAt: publication.createdAt,
          updatedAt: publication.updatedAt,
        });
      })
      .catch((error) => res.status(400).json({ error }));
  }
};

exports.getAllPublications = (req, res, next) => {
  Publication.findAll({
    include: [
      {
        model: User,
        as: "user",
        attributes: ["username"],
      },
    ],
    attributes: ["id", "uuid", "text", "image", "createdAt", "updatedAt"],
    order: [["createdAt", "DESC"]],
  })
    .then((publications) => res.status(200).json(publications))
    .catch((error) => res.status(404).json({ error }));
};

function deleteOldFile(oldPublication) {
  if (oldPublication.image !== null) {
    const filename = oldPublication.image.split("/images/")[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
    });
  }
}

exports.checkPreviousPublication = (req, res, next) => {
  id = req.params.id;

  try {
    Publication.findOne({ where: { id } })
      .then((publication) => {
        if (!publication) {
          throw "Cette publication n'existe pas !";
        }
        if (req.auth.uuid !== publication.uuid && req.auth.isAdmin === false) {
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

exports.modifyPublication = async (req, res, next) => {
  id = req.params.id;
  if (req.file) {
    await Publication.findOne({ where: { id } })
      .then(deleteOldFile)
      .catch((error) => res.status(500).json({ error }));

    await Publication.update(
      {
        text: req.body.text,
        image: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        return Publication.findOne({ where: { id: id } });
      })
      .then((publication) => {
        res.status(200).send({
          message: "Publication modifiée !",
          text: publication.text,
          image: publication.image,
          updatedAt: publication.updatedAt,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  }

  if (!req.file && req.body.image === null) {
    await Publication.findOne({ where: { id } })
      .then(deleteOldFile)
      .catch((error) => res.status(500).json({ error }));

    await Publication.update(
      { text: req.body.text, image: null },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        return Publication.findOne({ where: { id } });
      })
      .then((publication) => {
        res.status(200).send({
          message: "Publication modifiée !",
          text: publication.text,
          image: publication.image,
          updatedAt: publication.updatedAt,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  }

  if (!req.file && req.body.image === undefined) {
    await Publication.update(
      { text: req.body.text },
      {
        where: {
          id,
        },
      }
    )
      .then(() => {
        return Publication.findOne({ where: { id } });
      })
      .then((publication) => {
        res.status(200).send({
          message: "Publication modifiée !",
          text: publication.text,
          image: publication.image,
          updatedAt: publication.updatedAt,
        });
      })
      .catch((error) => res.status(404).json({ error }));
  }
};

exports.deletePublication = async (req, res, next) => {
  id = req.params.id;

  await Publication.findOne({ where: { id } })
    .then(deleteOldFile)
    .catch((error) => res.status(500).json({ error }));

  await Publication.destroy({
    where: {
      id,
    },
  })
    .then(() => res.status(200).send("Publication supprimée !"))
    .catch((error) => res.status(404).json({ error }));
};
