const jwt = require("jsonwebtoken");


module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // "Bearer fsdsaidsaldadansoipdna"
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.userData = {email: decodedToken.email, userId: decodedToken.userId};
    next(); // travel on request
  } catch(error) {
    res.status(401).json({ message: "you are not authenticated! "});
  }
};
