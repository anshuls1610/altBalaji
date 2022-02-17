const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/config');

module.exports = (req) => {
    const user = {
        id: 1,
        name: 'admin',
        password: bcrypt.hashSync('admin', 8)
    }

    const passwordIsValid = bcrypt.compareSync(
        'admin',
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    req.headers['x-access-token'] = token;
}