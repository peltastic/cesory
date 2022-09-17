const Checkout = (sequelize, DataTypes) => {
    const checkout = sequelize.define("checkout", {
        user_id: {
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false
        },
        checkout: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
    return checkout
}
module.exports = {Checkout}