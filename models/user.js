const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    _id: Number,
    name: String,
    address: String,
    dob: String,
    state: String,
    createdAt: Date
});

module.exports = mongoose.model('User', UserSchema);