const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // "Bearer fsdsaidsaldadansoipdna"
    jwt.verify(token, "secret_this_should_be_longer");
    next(); // travel on request
  } catch(error) {
    res.status(401).json({ message: "auth failed! "});
  }
};
