const { sign, verify } = require("jsonwebtoken");

const expiration = 24 * 3600; // seconds
const secret = process.env.JWT_SECRET;
 
exports.signJWT = (payload) => {
    return 'Bearer ' + sign(payload, secret, {
        expiresIn: expiration
    });
}

exports.verifyJWT = (tokenHeader) => {
    if (!tokenHeader) {
        return Promise.reject({ message: 'missing token' });
    }

    const splitted = tokenHeader.split(' ');
    if (splitted[0] !== 'Bearer') {
        return Promise.reject({ message: 'incorrect token format' });
    }

    const token = splitted[1];
    if (!token) {
        return Promise.reject({ message: 'no token provided' });
    }

    return new Promise((resolve, reject) => {
        verify(token, secret, (err, decoded) => {
            err
                ? reject(err.message || err)
                : resolve(decoded);
        });
    });
};
