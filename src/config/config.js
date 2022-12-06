const dotenv = require('dotenv');
dotenv.config();
module.exports = Config = () => {
    return {
        host: process.env.APP_HOST,
        port: process.env.APP_PORT,
        dbHost: process.env.DB_HOST,
        dbPort: process.env.DB_PORT,
        dbUser: process.env.DB_USER,
        dbPassword: process.env.DB_PASSWORD,
        dbName: process.env.DB_NAME,
        dbDriver: process.env.DB_DRIVER,
    }
}
