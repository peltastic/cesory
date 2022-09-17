
const User = (sequelize, DataTypes) => {
  const user = sequelize.define("users", {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_role: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cart_count: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  });
  return user
}


module.exports = {User}
