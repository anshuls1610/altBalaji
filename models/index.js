const mongoose = require('mongoose');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config')[env];
const url = config.database;

mongoose.Promise = Promise;
const connect = async () => {
    // return new Promise((resolve, reject) => {
    await mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to DB!');
        // resolve();
    }).catch(err => {
        console.log('Error: ', err.message);
        // return reject(err);
    });
    // });
}

const close = () => {
    return mongoose.disconnect();
}

module.exports = { connect, close };
module.exports.User = require('./user');
module.exports.Counter = require('./counter');
