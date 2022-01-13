const Publication = require("../models/Publication");
const fs = require("fs");


exports.createPublication = (req, res, next) => {

  if (req.file){
  const publication = {
    author_id: req.body.authorId,
    text: req.body.text,
    image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
  };
  Publication.create(publication)
    .then(() => res.status(201).json({ message: "Publication créée !" }))
    .catch((error) => res.status(400).json({ error }));
    } else { 
      const publication = {
        author_id: req.body.authorId,
        text: req.body.text,
        image: ""
      };
      Publication.create(publication)
        .then(() => res.status(201).json({ message: "Publication créée !" }))
        .catch((error) => res.status(400).json({ error }));

    }
};

exports.getAllPublications = (req, res, next) =>{
  Publication.findAll()
    .then((publications) => res.status(200).json(publications))
    .catch((error) => res.status(404).json({ error }));

};

exports.modifyPublication = async (req, res, next) => {
  id = req.params.id;

  if (req.file) {
    await Publication.findOne({ where: { id: id } })
      .then((publication) => {
        const filename = publication.image.split("/images/")[1];
        console.log(filename);
        fs.unlink(`images/${filename}`, (err) => {
          if (err) throw err;
        });
      })
      .catch((error) => res.status(500).json({ error }));
  };

  await Publication.update(
    {
      text: req.body.text,
      image: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
    },
    {
      where: {
        id: id,
      },
    }
  )
    .then(() => res.status(200).send("Publication mise à jour !"))
    .catch((error) => res.status(404).json({ error }));
};;
