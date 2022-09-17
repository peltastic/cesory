const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkout")
const authMiddleware = require("../middleware/authJwt");

router.get(
    "/:userId",
    [authMiddleware.verifyToken, authMiddleware.isUser],
    checkoutController.get_checkout

)
module.exports = router;