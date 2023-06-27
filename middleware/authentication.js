const CustomError = require("../errors");
const { verifyJWT } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    res.status(403).send("Authentication failed");
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }

  try {
    const { name, userId, role } = verifyJWT({ token });

    req.user = { userId, name, role };
    next();
  } catch (err) {
    throw new CustomError.UnauthenticatedError("Authentication failed");
  }
};

const authorizePermissions = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );

    next();
  };
};

module.exports = {
  authenticateUser,
  authorizePermissions,
};
