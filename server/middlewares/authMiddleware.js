const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized! No token provided",
    });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "CLIENT_SECRET_KEY");

    // Only allow admin
    if (decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Forbidden! Only admin can access this resource",
      });
    }

    req.user = decoded; // attach decoded user info
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized! Invalid token",
    });
  }
};

module.exports = { authMiddleware };
