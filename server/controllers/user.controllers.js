const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/User");
const Publication = require("../models/Publication");
const Comment = require("../models/Comment");

User.hasMany(Publication, { onDelete: "CASCADE" }, { as: "publications" });
User.hasMany(Comment, { onDelete: "CASCADE" }, { as: "comments" });

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      User.create(user)
        .then(() =>
          res
            .status(201)
            .json({
              message:
                "Utilisateur créé ! Rendez-vous sur la page de connexion.",
            })
        )
        .catch((error) => {
          // prevent sending sensible data to the front-end
          delete error.errors[0].instance.dataValues.password;
          delete error.errors[0].instance.dataValues.isAdmin;
          delete error.errors[0].instance.dataValues.id;
          delete error.errors[0].instance.dataValues.uuid;
          delete error.errors[0].instance.dataValues.createdAt;
          delete error.errors[0].instance.dataValues.updatedAt;

          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            uuid: user.uuid,
            message: "Utilisateur connecté !",
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getOneUser = (req, res, next) => {
  const uuid = req.params.uuid;
  User.findOne({ where: { uuid } })
    .then((user) => {
      //prevent sending sensible data to the front-end
      delete user.dataValues.id;
      delete user.dataValues.password;
      delete user._previousDataValues;
      const isConnected = true;
      res.status(200).json({ user, isConnected });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  if (req.auth.isAdmin === false) {
    res.status(401).json("Requête non autorisée");
  } else {
    User.findAll()
      .then((users) => res.status(200).json(users))
      .catch((error) => res.status(404).json({ error }));
  }
};

exports.checkPreviousUser = (req, res, next) => {
  uuid = req.params.uuid;

  try {
    User.findOne({ where: { uuid } })
      .then((user) => {
        if (!user) {
          throw "Cet utilisateur n'existe pas !";
        }
        if (req.auth.uuid !== user.uuid && req.auth.isAdmin === false) {
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

exports.modifyUser = (req, res, next) => {
  uuid = req.params.uuid;
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const modifiedUser = {
        username: req.body.username,
        email: req.body.email,
        password: hash,
      };
      User.update(modifiedUser, {
        where: {
          uuid,
        },
      })
        .then(() => {
          return User.findOne({ where: { uuid } });
        })
        .then((user) => {
          res.status(201).json({
            message: "Utilisateur modifié !",
            username: user.username,
            email: user.email,
            updatedAt: user.updatedAt,
          });
        })
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// when deleting the user, it's publications, comments and associated files are deleted too
function deleteOldFile(oldPublication) {
  if (oldPublication.image !== null) {
    const filename = oldPublication.image.split("/images/")[1];
    fs.unlink(`images/${filename}`, (err) => {
      if (err) throw err;
    });
  }
}

exports.deleteUser = async (req, res, next) => {
  uuid = req.params.uuid;

  await Publication.findAll({ where: { uuid } })
    .then((publications) => {
      for (let publication of publications) {
        deleteOldFile(publication);
      }
    })
    .catch((error) => res.status(500).json({ error }));

  await User.destroy({
    where: {
      uuid,
    },
  })
    .then(() => res.status(200).send("Utilisateur supprimé !"))
    .catch((error) => res.status(404).json({ error }));
};

// password and email check
const passwordSchema = require("../models/password");

exports.passwordCheck = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir entre 8 et 60 caractères, dont une majuscule, une minuscule et un chiffre.",
    });
  } else {
    next();
  }
};

exports.emailCheck = (req, res, next) => {
  const validEmail = (email) => {
    let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let isRegexTrue = emailRegexp.test(email);
    isRegexTrue
      ? next()
      : res.status(400).json({ message: "Adresse email non valide" });
  };
  validEmail(req.body.email);
};
