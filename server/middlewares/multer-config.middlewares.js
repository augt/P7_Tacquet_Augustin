const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/gif": "gif",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_");
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + "." + extension);
  },
});

module.exports = multer({
  storage: storage,
  limits: { fileSize: 10485760 },
  fileFilter: (req, file, cb) => {
    if (
      (file.mimetype == "image/png") ||
      (file.mimetype == "image/jpg") ||
      (file.mimetype == "image/jpeg") ||
      (file.mimetype == "image/gif")
    ) {
      cb(null, true);
    } else {
      cb(
        "Seuls les fichiers avec une extension de type .png, .jpg, .jpeg et .gif sont autorisés.",
        false
      );
    }
  },
}).single("image");
