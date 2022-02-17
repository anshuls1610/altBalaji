const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const url = config.database;

mongoose.Promise = Promise;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to DB!');
}).catch(err => {
    console.log('Error: ', err.message);
});

module.exports.User = require('./user');
module.exports.Counter = require('./counter');
