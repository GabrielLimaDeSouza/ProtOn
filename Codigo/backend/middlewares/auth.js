const JWT = require("jsonwebtoken");
const { SECRET_KEY } = require("../auth/configs");

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token was not provided" });
  }

  const [, token] = authHeader.split(" ");

  JWT.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) res.status(401).json({ error: "Token invalido" });

    req.userId = decoded.id;
    next();
  });
};

module.exports = authenticationMiddleware;
