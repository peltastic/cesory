const bcrypt = require("bcrypt");
const roles = require("../../config/roles");
const DB = require("../../db");
const jwtToken = require("../utils/generateJwt");
const { v4 } = require("uuid");
const { QueryTypes } = require("sequelize");

const sign_user_up = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  if (!name || !email || !password) {
    console.log(name, email, password);
    return res.status(400).json({ error: "Enter Required Fields" });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }
  // try {
    const user_email = await DB.sequelize.query("SELECT email FROM users", {
      type: QueryTypes.SELECT,
    });
    const email_exists = user_email.find((query) => query.email === email);
    if (email_exists) {
      return res.status(409).json({ error: "email already exists" });
    }
    const hash = await bcrypt.hash(password, 14);
     await DB.User.create({
      user_id: v4(),
      user_name: name,
      password: hash,
      email: email,
      user_role: roles.Roles["User"],
      cart_count: 0
    });
  // } catch (err) {
  //   return res.status(400).json({ error: err });
  // }
  return res.status(200).json("success");
};

const login_user = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  if (password.length < 6) {
    return res.status(400).json({ error: "Password too short" });
  }
  let user_data;
  let generate_token;

  try {
    user_data = await DB.sequelize.query(
      "SELECT * FROM users WHERE email = ?",
      {
        replacements: [email],
        type: QueryTypes.SELECT,
      }
    );
    const email_exists = user_data.find((query) => query.email === email);
    if (!email_exists)
      return res.status(401).json({ error: "user not found please signup" });
    var passwordIsValid = bcrypt.compareSync(password, user_data[0].password);
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: "Invalid Password!",
      });
    }
    generate_token = await jwtToken.generateJwt(
      user_data[0].email,
      user_data[0].user_id
    );

    if (generate_token.error) {
      return res.status(400).send({
        message: "unable to generate access token",
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json({ accessToken: generate_token.token });
};

const user = async (req, res) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.sendStatus(400);
  }
  const decoded = await jwtToken.verifyJwt(token);
  if (decoded.error) {
    return res.status(400).json({ error: decoded.error });
  }
  const userId = decoded.decoded.id;
  const userinfo = await DB.sequelize.query(
    "SELECT email, user_name, user_role, user_id, cart_count from users WHERE user_id = ?",
    {
      replacements: [userId],
      type: QueryTypes.SELECT,
    }
  );
  res.status(200).send(userinfo[0]);
};

module.exports = {
  sign_user_up,
  login_user,
  user,
};
