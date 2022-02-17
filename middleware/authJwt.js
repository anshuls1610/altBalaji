const jwt = require('jsonwebtoken');
const config = require('../config/config');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (!token) {
        return res.status(403).send({
            message: 'No token provided!'
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: 'Unauthorized!'
            });
        }
        req.userId = decoded.id;
        console.log('here in jwt verifying user: ', req.userId);
        next();
    });
};
