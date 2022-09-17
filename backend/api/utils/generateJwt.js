const jwt = require("jsonwebtoken");
const authConfig = require("../../config/auth");

async function generateJwt(email, userId) {
  try {
    const payload = { email: email, id: userId };
    const token = await jwt.sign(payload, authConfig.JWT_SECRET, {
      expiresIn: authConfig.JWT_EXPIRATION,
    });
    return { error: false, token: token };
  } catch (error) {
    return { error: error };
  }
}

async function verifyJwt(token) {
  try {
    const decoded = await jwt.verify(token, authConfig.JWT_SECRET);
    return { error: false, decoded: decoded };
  } catch (error) {
    return { error: error };
  }
}
module.exports = { generateJwt, verifyJwt };
