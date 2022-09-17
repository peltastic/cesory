const dotenv = require("dotenv")
dotenv.config()

module.exports.Roles = {
    "Admin": process.env.ADMIN,
    "User":  process.env.USER
}