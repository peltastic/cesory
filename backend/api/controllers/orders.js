const DB = require("../../db");
const { QueryTypes } = require("sequelize");

const { v4 } = require("uuid");
const create_orders = async (req, res) => {
  const { username, address, userId } = req.body;
  try {
    const orders = await DB.sequelize.query(
      `SELECT * FROM carts WHERE user_id = ?`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    for (const order of orders) {
      const id = v4();
      await DB.Order.create({
        order_id: id,
        user_name: username,
        address: address,
        product_name: order.product_name,
        price: order.total_price,
        product_id: order.product_id,
        user_id: order.user_id,
        product_brand: "productBrand",
        is_completed: false,
        order_count: order.count,
      });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.sendStatus(200);
};
const confirm_order = async (req, res) => {
  const confirmed = req.params.orderId;
  try {
    await DB.Order.update(
      { is_completed: true },
      {
        where: {
          order_id: confirmed,
        },
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.sendStatus(200);
};
const get_all_orders = async (req, res) => {
  let orders;
  try {
    orders = await DB.sequelize.query(`SELECT * FROM orders`, {
      type: QueryTypes.SELECT,
    });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json({
    data: orders,
  });
};

const get_user_orders = async (req, res) => {
  const userId = req.params.userId;
  let orders;
  try {
    orders = await DB.sequelize.query(
      `SELECT * FROM orders WHERE user_id = ?`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
  } catch (err) {
    return res.status(400).json({ error: err });
  }
  return res.status(200).json({
    data: orders,
  });
};
module.exports = {
  create_orders,
  confirm_order,
  get_all_orders,
  get_user_orders,
};
