const { body } = require('express-validator');
const validationReview = require('./validation-review');

exports.validateCreateRole = () => [
    body('rolename')
        .notEmpty()
        .withMessage('rolename is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('rolename must be a string'),
    validationReview
];
 