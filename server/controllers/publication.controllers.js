const Publication = require("../models/Publication");
const fs = require("fs");


exports.createPublication = (req, res, next) => {
  const publication = {
    author_id: req.body.authorId,
    text: req.body.text,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  Publication.create(publication)
    .then(() => res.status(201).json({ message: "Publication créée !" }))
    .catch((error) => res.status(400).json({ error }));
};