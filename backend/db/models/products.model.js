const Products = (sequelize, DataTypes) => {
    const products = sequelize.define("product", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        desc: {
            type: DataTypes.STRING,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_id: {
            type: DataTypes.UUID,
            allowNull: false
        },
        product_image: {
            type: DataTypes.STRING,
            allowNull: false
        },
        product_brand: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return products
}


module.exports = {Products}