const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('./config/config');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({
    limit: '5mb',
    extended: false
}));
app.use(cors());
app.use(cookieParser());

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.all('*', (req, res, next) => {
    let user = {
        id: 1,
        name: 'admin',
        password: bcrypt.hashSync('admin', 8)
    }

    var passwordIsValid = bcrypt.compareSync(
        'admin',
        user.password
    );

    if (!passwordIsValid) {
        return res.status(401).send({
            accessToken: null,
            message: "Invalid Password!"
        });
    }

    var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400 // 24 hours
    });
    req.headers['x-access-token'] = token;
    next();
});

app.use('/', indexRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port', port);
})