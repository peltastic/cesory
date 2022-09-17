const express = require("express");
const router = express.Router();
const productsController = require("../controllers/products");
const rolesMiddleware = require("../middleware/authJwt");

router.post(
  "/add",
  [rolesMiddleware.verifyToken, rolesMiddleware.isAdmin],
  productsController.add_product
);
router.get("/getproducts", productsController.get_products);
router.get("/:id", productsController.get_product);
router.delete(
  "/delete/:id",
  [rolesMiddleware.verifyToken, rolesMiddleware.isAdmin],
  productsController.delete_product
);

module.exports = router;
