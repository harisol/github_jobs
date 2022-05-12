const { body } = require('express-validator');
const validationReview = require('./validation-review');

exports.validateSignup = () => [
    body('username')
        .notEmpty()
        .withMessage('username is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('username be a string')
        .bail()
        .isLength({ min: 6 })
        .withMessage('username must be at least 6 characters'),
    body('password')
        .notEmpty()
        .withMessage('password is required')
        .bail() // continue only when previous check is valid
        .isString()
        .withMessage('password must be a string')
        .bail()
        .isLength({ min: 6 })
        .withMessage('password must be at least 6 characters'),
    validationReview
];

exports.validateLogin = () => [
    body('username')
        .notEmpty()
        .withMessage('username is required'),
    body('password')
        .notEmpty()
        .withMessage('password is required'),
    validationReview
];