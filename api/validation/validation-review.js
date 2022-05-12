const { validationResult } = require("express-validator");

/** 
 * check validation result of express validator
 * @type {import("express").RequestHandler} 
 */
 module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({
        message: 'bad request',
        errors: errors.array().map(err => err.msg)
    });
};
