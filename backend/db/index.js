require("pg").defaults.parseInt8 = true;
const { Sequelize, DataTypes } = require("sequelize");
const UserModels = require("./models/user.model");
const ProductModels = require("./models/products.model");
const OrderModels = require("./models/order.model");
const CartModels = require("./models/cart.model");
const CheckoutModels = require("./models/checkout.model");
const dbConfig = require("../config/db");
// const dbConfig = {}

const sequelize = new Sequelize("tech_store", "postgres", "pex3123", {
  host: "localhost",
  dialect: "postgres",
});
// const sequelize = new Sequelize(
//   dbConfig.DB_DRIVER || "database",
//   dbConfig.DB_USER || "postgres",
//   dbConfig.DB_PASSWORD || "yourpassword",
//   {
//     host: dbConfig.DB_HOST || "localhost",
//     dialect: "postgres",
//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
//       },
//     },
//   }
// );
const User = UserModels.User(sequelize, DataTypes);
const Product = ProductModels.Products(sequelize, DataTypes);
const Order = OrderModels.Order(sequelize, DataTypes);
const Cart = CartModels.Cart(sequelize, DataTypes);
const Checkout = CheckoutModels.Checkout(sequelize, DataTypes);
const init = async () => {
  User.hasOne(Checkout, {
    foreignKey: "user_id",
  });
  User.hasMany(Order, {
    foreignKey: "user_id",
  });
  User.hasMany(Cart, {
    foreignKey: "user_id",
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  await sequelize.sync();
};
module.exports = {
  init,
  sequelize,
  DataTypes,
  User,
  Order,
  Cart,
  Product,
  Checkout,
};
