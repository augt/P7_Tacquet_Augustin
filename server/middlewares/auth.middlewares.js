const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const uuid = decodedToken.uuid;

    const user = await User.findOne({ where: { uuid: uuid } });
    const isAdmin = user.isAdmin;

    req.auth = { uuid, isAdmin };
    if (req.body.uuid && req.body.uuid !== uuid && isAdmin===false) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
