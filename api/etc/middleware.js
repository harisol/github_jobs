const { User } = require("../database/models");
const { CustomError } = require("./error-handler");
const { verifyJWT } = require("./my-jwt");

/**
 * middleware for logging each API hit
 * @type {import("express").RequestHandler}
 */
exports.customLog = (req, _res, next) => {
    if (req.app.get('env') !== 'test') {
        console.log('accessing', req.method, req.originalUrl);
    }
    next();
};

/**
 * middleware for verify jwt at header
 * @type {import("express").RequestHandler}
 */
exports.checkToken = (req, res, next) => {
    // routes which don't need this middleware
    const freeRoutes = [
        '/',
        '/signup',
        '/login',
    ];
    const path = req.path;
    const registeredPath = req.app.get('registeredPath');
    
    if (freeRoutes.includes(path) || !registeredPath.includes(path)) {
        // skip middleware on freeRoutes or invalid routes
        return next();
    }

    verifyJWT(req.headers['x-access-token']).then(async decoded => {
        // check user with retrieved data
        const user = await User.findByPk(decoded.id);
        if (!user) {
            throw new CustomError(401, 'invalid token');
        }

        // set user data in req property
        req.authedUser = {
            id: decoded.id,
            username: decoded.username,
            rolename: decoded.rolename
        };

        next();
    }).catch(err => {
        if (err == 'jwt expired') {
            return next(new CustomError(401, err));
        }
        next(err);
    });
};

/**
 * this is not a middleware. get available path
 * after registering all routes
 * 
 * @param {import("express").Express} server 
 */
 exports.registerAvailablePath = (server) => {
    const registeredPath = [];
    server._router.stack.forEach(middleware => {
        if (middleware.route) {
            // paths registered directly on the server
            const route = middleware.route;
            !registeredPath.includes(route.path) && registeredPath.push(route.path);
        } else if (middleware.name === 'router') {
            // paths registered on router 
            middleware.handle.stack.forEach(handler => {
                const route = handler.route;
                route && !registeredPath.includes(route.path) && registeredPath.push(route.path);
            });
        }
    });

    // save this in express app to use in middleware
    server.set('registeredPath', registeredPath);
};
