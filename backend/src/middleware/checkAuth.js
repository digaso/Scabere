const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {
  try {
    const token = request.headers.authorization;
    if (!token)
      return response.status(401).json({
        message: "authorization failed",
      });
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    request.userData = decoded;
    next();
  } catch (error) {
    return response.status(401).json({
      message: "authorization failed",
    });
  }
};
