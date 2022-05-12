const { body } = require('express-validator');
const validationReview = require('./validation-review');

exports.validateCreateUser = () => [
    body('username')
        .notEmpty()
        .withMessage('username is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('username must be a string'),
    body('role_id')
        .notEmpty()
        .withMessage('role_id is required')
        .bail() // continue only when previous check is valid
        .isInt()
        .withMessage('role_id must be an integer'),
    validationReview
];