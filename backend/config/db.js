const dotenv = require('dotenv')
dotenv.config()

module.exports = {
    DB_DRIVER: process.env.DB_DRIVER,
    DB_SOURCE: process.env.DB_SOURCE,
    DB_PASSWORD: process.env.DB_PASSWORD,
    DB_USER: process.env.DB_USER,
    DB_HOST: process.env.DB_HOST,
    PASSOWRD: process.env.PASSWORD

}