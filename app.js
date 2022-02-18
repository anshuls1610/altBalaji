const express = require('express');
const app = express();
const db = require('./models/index');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const loginController = require('./controllers/login');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({
    limit: '5mb',
    extended: false
}));
app.use(cors());
app.use(cookieParser());

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');

app.all('*', async (req, res, next) => {
    await loginController(req);
    next();
});

app.use('/', indexRouter);
app.use('/api/users', userRouter);

const port = process.env.PORT || 3000;
if (process.env.NODE_ENV != 'test') {
    db.connect().then(() => {
        app.listen(port, () => {
            console.log('Listening on port', port);
        });
    });
} else {
    app.listen(port, () => {
        console.log('Listening on port', port);
    });
}

module.exports = app;