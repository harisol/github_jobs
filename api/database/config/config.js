require('dotenv').config();

module.exports = {
  development: {
    uri: process.env.DEV_DATABASE_URI, // A full database URI
    host: process.env.DEV_DATABASE_HOST,
    username: process.env.DEV_DATABASE_USERNAME,
    password: process.env.DEV_DATABASE_PASSWORD,
    database: process.env.DEV_DATABASE_NAME,
    logging: false,
    dialect: 'postgres',
  },
  production: {
    uri: process.env.PROD_DATABASE_URI, // A full database URI
    host: process.env.PROD_DATABASE_HOST,
    username: process.env.PROD_DATABASE_USERNAME,
    password: process.env.PROD_DATABASE_PASSWORD,
    database: process.env.PROD_DATABASE_NAME,
    logging: false,
    dialect: 'postgres',
  },
  test: {
    host: process.env.TEST_DATABASE_HOST,
    username: process.env.TEST_DATABASE_USERNAME,
    password: process.env.TEST_DATABASE_PASSWORD,
    database: process.env.TEST_DATABASE_NAME,
    logging: false,
    dialect: 'postgres',
  },
};