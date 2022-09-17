const Order = (sequelize, DataTypes) => {
  const order = sequelize.define("order", {
    order_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false

    },
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    product_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false
    },
    is_completed: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    order_count: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  });
  return order
};
module.exports = {Order}
