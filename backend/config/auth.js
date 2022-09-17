const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRATION: `${process.env.JWT_EXPIRATION}h`,
    JWT_EXPIRATION_MS: process.env.JWT_EXPIRATION_MS,
    JWT_REFRESH_EXPIRATION: process.env.JWT_REFRESH_EXPIRATION
}