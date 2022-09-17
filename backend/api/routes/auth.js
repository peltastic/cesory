const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");
const verifyJwt = require("../middleware/authJwt")


router.post("/signup", authController.sign_user_up);
router.post("/login", authController.login_user);                           
router.get("/user", [verifyJwt.verifyToken] ,authController.user);                                                   

module.exports = router;
