const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");
const isUserMiiddleware = require("../middleware/authJwt");

router.post(
  "/create",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
  orderController.create_orders
);
router.put(
  "/confirm/:orderId",
  [isUserMiiddleware.verifyToken, isUserMiiddleware.isAdmin],
  orderController.confirm_order
);
router.get(
    "/all",
    [isUserMiiddleware.verifyToken, isUserMiiddleware.isAdmin],
    orderController.get_all_orders
)
router.get(
    "/user/orders/:userId",
    [isUserMiiddleware.verifyToken, isUserMiiddleware.isUser],
    orderController.get_user_orders
)

module.exports = router;
