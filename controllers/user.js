const db = require('../models/index');
const getNextSequence = require('./getNextSequence');

exports.getAllUsers = async (req, res) => {
    await db.User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log('error while finding user: ', err);
            throw new Error(err);
        });
}

exports.createUser = async (req, res) => {
    let id = await getNextSequence('userid');
    let user = {
        _id: id,
        name: req.body.name,
        address: req.body.address,
        dob: req.body.dob,
        state: req.body.state,
        createdAt: new Date(),
    }

    await db.User.create(user)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            console.log('error while creating user: ', err);
            throw new Error(err);
        });
}

exports.getUserById = async (req, res) => {
    await db.User.findOne({ _id: req.params.id })
        .then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log('error while fetching user: ', err);
            throw new Error(err);
        });
}

exports.updateUserById = async (req, res) => {
    await db.User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
    ).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        console.log('error while updating user: ', err);
        throw new Error(err);
    });
}

exports.removeUserById = async (req, res) => {
    await db.User.findByIdAndDelete(req.params.id)
        .then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            console.log('error while deleting user: ', err);
            throw new Error(err);
        });
}