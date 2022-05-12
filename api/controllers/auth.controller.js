const bcrypt = require("bcryptjs");
const { User } = require("../database/models");
const { CustomError } = require("../etc/error-handler");
const { signJWT } = require("../etc/my-jwt");

/** @type {import("express").RequestHandler} */
exports.signup = (req, res, next) => {
    const { username, password } = req.body;

    bcrypt.hash(password, 10).then(async (hash) => {
        await User.create({
          username,
          password: hash,
        }).then((user) => {
            res.status(200).json({
                username: user.username,
                message: "successfully registered",
            });
        })
    }).catch((error) => {
        next(error);
    });
};

/** @type {import("express").RequestHandler} */
exports.login = (req, res, next) => {
    const { username, password } = req.body;
    const msgInvalidLogin = 'invalid username/password';

    User.findByUserName(username)
        .then(async user => {
            if (!user) {
                throw new CustomError(401, msgInvalidLogin);
            }

            // comparing given password with hashed password
            const result = await bcrypt.compare(password, user.password);
            if (!result) {
                throw new CustomError(401, msgInvalidLogin);
            }

            // data can be retrieved in token
            const payload = {
                id: user.id,
                username: user.username,
            };

            const token = signJWT(payload);

            // res.cookie('goodie-token', token, { secure: true, httpOnly: true })
            res.status(200).json({
                auth: true,
                accessToken: token,
            });
        }).catch(error => {
            next(error);
        });
};
