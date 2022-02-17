const express = require('express');
const router = express.Router();
const db = require('../models/index');

const getNextSequence = async (name) => {
    await db.Counter.find({
        _id: 'userid',
    }).then(async (res) => {
        if (res.length == 0) {
            await db.Counter.create({
                _id: 'userid',
                seq: 0
            }).catch((err) => {
                console.log('error while creating counter: ' + name, err);
                throw new Error(err);
            });
        }
    }).catch((err) => {
        console.log('error while finding counter: ' + name, err);
        throw new Error(err);
    });

    let id;
    await db.Counter.findOneAndUpdate(
        { _id: name },
        { $inc: { seq: 1 } },
        { new: true }
    )
        .then((res) => {
            id = res.seq
        })
        .catch((err) => {
            console.log('error while finding & updating counter: ' + name, err);
            throw new Error(err);
        });

    return id;
}

router.get('/', async (req, res) => {
    await db.User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log('error while finding user: ', err);
            throw new Error(err);
        });
});

router.post('/', async (req, res) => {
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
});

router.get('/:id', async (req, res) => {
    await db.User.find({ _id: req.params.id })
        .then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log('error while fetching user: ', err);
            throw new Error(err);
        });
});

router.put('/:id', async (req, res) => {
    await db.User.findByIdAndUpdate(
        { _id: req.params.id },
        req.body
    ).then((user) => {
        res.status(200).json(user);
    }).catch((err) => {
        console.log('error while updating user: ', err);
        throw new Error(err);
    });
});

router.delete('/:id', async (req, res) => {
    await db.User.findByIdAndDelete(req.params.id)
        .then((user) => {
            res.status(200).json(user);
        }).catch((err) => {
            console.log('error while deleting user: ', err);
            throw new Error(err);
        });
});

module.exports = router;