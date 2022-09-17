const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyparser = require("body-parser");
const authRoutes = require("./api/routes/auth");
const cartRoutes = require("./api/routes/carts");
const productsRoutes = require("./api/routes/products");
const orderRoutes = require("./api/routes/orders");
const checkoutRoutes = require("./api/routes/checkout");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

dotenv.config();
const DB = require("./db");

DB.init();
app.use(bodyparser.json({ limit: "2mb" }));
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ credentials: true, origin: true }));

app.use("/auth", authRoutes);
app.use("/products", productsRoutes);
app.use("/cart", cartRoutes);
app.use("/order", orderRoutes);
app.use("/checkout", checkoutRoutes);
app.get("/test", function (_, res) {
  res.status(200).json({ message: "testissng!!!!" });
});

app.listen(
  // process.env.PORT,
  8000,
  () => console.log("server is running")
);
