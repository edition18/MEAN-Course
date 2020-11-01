const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // "Bearer fsdsaidsaldadansoipdna"
    const decodedToken = jwt.verify(token, "secret_this_should_be_longer");
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next(); // travel on request
  } catch(error) {
    res.status(401).json({ message: "auth failed! "});
  }
};
