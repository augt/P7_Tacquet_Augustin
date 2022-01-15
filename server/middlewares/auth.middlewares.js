const jwt = require("jsonwebtoken");
const User = require("../models/User");


module.exports = async (req, res, next) => {
  try {
      console.log(req.body)
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;

    const user = await User.findOne({ where: { id: userId } });
    const isAdmin = user.isAdmin;

    req.auth = { userId, isAdmin };
    if (req.body.userId && req.body.userId !== userId && isAdmin===false) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({ error: error | "Requête non authentifiée !" });
  }
};
