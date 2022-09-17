const { QueryTypes } = require("sequelize");
const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");
const sequelizeInstance = require("../../db");
const { verifyJwt } = require("../utils/generateJwt");

const { TokenExpiredError } = jwt;
const catchTokenExpiredError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: "Unauthorized ! Access Token was Expired" });
  }
  return res.status(401).send({ message: "Unauthorized!" });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).send({ message: "Unauthorized" });
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(403).send({
      message: "No token provides!",
    });
  }
  jwt.verify(token, authConfig.JWT_SECRET, (err, decoded) => {
    if (err) {
      return catchTokenExpiredError(err, res);
    }
    req.userID = decoded.id;
    next();
  });
};

const isUser = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }
  const payload = await verifyJwt(token);
  const userId = payload.decoded.id;

  try {
    const user_role = await sequelizeInstance.sequelize.query(
      "SELECT user_role FROM users WHERE user_id = ?",
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    const role = user_role[0];
    if (role === 9000 || 5180) {
      next();
      return;
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(403).send({
    message: "Require User Role",
  });
};

const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(403);
  }
  const payload = await verifyJwt(token);
  const userId = payload.decoded.id;
  try {
    const user_role = await sequelizeInstance.sequelize.query(
      "SELECT user_role FROM users WHERE user_id = ?",
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    const role = user_role[0];
    if (role.user_role === 5180) {
      next();
      return;
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(403).send({
    message: "Require Admin Role!",
  });
};

module.exports = { verifyToken, isUser, isAdmin };
