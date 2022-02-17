const express = require('express');
const router = express.Router();
const db = require('../models/index');

router.get('/', async (req, res) => {
    await db.User.find({})
        .then((users) => {
            res.json(users);
        })
        .catch((err) => {
            console.log(err);
        })
});

router.post('/', (req, res) => {
    let user = {
        name: req.body.name,
        address: req.body.address,
        dob: req.body.dob,
        state: req.body.state,
        createdAt: new Date(),
    }

    db.User.create(user)
        .then((user) => {
            res.status(201).json(user);
        })
        .catch((err) => {
            res.send(err);
        });
});

module.exports = router;