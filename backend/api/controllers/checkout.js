const DB = require("../../db");
const { QueryTypes } = require("sequelize");

const get_checkout = async (req, res) => {
  const userId = req.params.userId;
  if(!userId){
    return res.sendStatus(400)
  }
  try {
    const getCartPrices = await DB.sequelize.query(
      `SELECT total_price FROM carts where user_id = ?`,
      {
        replacements: [userId],
        type: QueryTypes.SELECT,
      }
    );
    let totalPrice = 0;
    for (const price of getCartPrices) {
      totalPrice += price.total_price;
    }
    const is_checkout_query = await checkoutQuery(userId);
    if (is_checkout_query.length > 0) {
      await DB.Checkout.update(
        { checkout: totalPrice },
        {
          where: {
            user_id: userId,
          },
        }
      );
    } else {
      await DB.Checkout.create({
        user_id: userId,
        checkout: totalPrice,
      });
    }
    const checkout_query = await checkoutQuery(userId);
    const checkout = checkout_query[0].checkout;
    return res.status(200).json({ data: checkout });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
};

async function checkoutQuery(userId) {
  const checkout_query = await DB.sequelize.query(
    `SELECT checkout FROM checkouts where user_id = ?`,
    {
      replacements: [userId],
      type: QueryTypes.SELECT,
    }
  );
  return checkout_query;
}

module.exports = {
  get_checkout,
};
