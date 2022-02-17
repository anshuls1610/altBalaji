const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');

app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({
    limit: '5mb',
    extended: false
}));
app.use(cors());
app.use(cookieParser());

const indexRouter = require('./routes/index');
var userRouter = require('./routes/user');

app.use('/', indexRouter);
app.use('/api/user', userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Listening on port', port);
})