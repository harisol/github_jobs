require('dotenv').config();

/**
 * about NODE_ENV value:
 * - check if set in this file
 * - if not found, check in cross-env usage at package.json scripts
 * - if not found, check in .env file
 * 
 * default value of NODE_ENV is undefined.
 * default value of server.get('env') is "development".
 * if you set NODE_ENV value before init the server (calling "express()"),
 * server.get('env') will be equal to NODE_ENV.
 */
if (!process.env.NODE_ENV) {
    process.env.NODE_ENV='development';
}

const server = require('./server');

const HOST = process.env.SERVER_HOST || 'localhost';
const PORT = process.env.SERVER_PORT || 3030;

server.listen(PORT, HOST, () => {
    console.log(`Server is live at ${HOST}:${PORT} using environment "${server.get('env')}"`)
});
