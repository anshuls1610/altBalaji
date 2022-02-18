const db = require('../models/index');

module.exports = async (name) => {
    if (process.env.NODE_ENV == 'test') {
        return 1;
    }
    console.log('name', name)
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