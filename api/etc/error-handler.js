exports.CustomError = class extends Error {
    
    /**
     * @param {Number} statusCode
     * @param {String} message
     */
    constructor(statusCode, message) {
      super();
      this.statusCode = statusCode;
      this.message = message;
    }
}

/** @type {import("express").RequestHandler} */
exports.notFoundError = (_req, _res) => {
    // this goes to function 'handleError' below
    throw (new this.CustomError(404, 'page not found'));
}

/**
 * handle uncaught error, except uncaught promise rejection.
 * you must cath promise rejection and call 'next()'
 * inside it by yourself
 * 
 * @type {import("express").ErrorRequestHandler}
 */
exports.handleError = (err, _req, res, _next) => {
    const { name, statusCode, message, errors } = err;

    // sequelize error
    if (name?.includes('Sequelize') && Array.isArray(errors)) {
        return res.status(400).json({
            message: message,
            errors: errors.map(e => e.message)
        });
    }

    // show not common error format to console 
    if (!message && typeof err !== 'string') {
        console.log(err);
    }

    res.status(statusCode || 500).json({
        message: typeof err === 'string'
            ? err
            : message || 'unexpected error'
    });
}
