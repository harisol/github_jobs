const express = require('express');
const { notFoundError, handleError } = require('./etc/error-handler');
const { customLog, registerAvailablePath } = require('./etc/middleware');
const router = require('./routes');

const server = express();

// accept body with content-type application/json
server.use(express.json());
server.use(customLog);

// register routes with this prefix
server.use('/api', router);

registerAvailablePath(server);

/** make sure to put code below after all available routes **/

// handle 404. 
server.use(notFoundError);

// handle uncaught error
server.use(handleError);

module.exports = server;
