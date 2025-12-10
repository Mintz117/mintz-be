const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      return res.status(401).json({
        error: { status: 401, message: "Chưa cung cấp access token!" },
      });
    }
    const authHeader = req.headers["authorization"];
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];

    if (!token) {
      return res.status(401).json({
        error: { status: 401, message: "Access token không hợp lệ!" },
      });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        return res.status(401).json({
          error: { status: 401, message: "Access token không hợp lệ!" },
        });
      }
      req.payload = payload;
    });
    next();
  } catch (error) {
    next(error)
  }
};
const authMiddleware = {
  verifyAccessToken,
};

module.exports = authMiddleware;
