require('dotenv').config();

module.exports = {
    'secret': 'authentication',
    'development': {
        'database': process.env.DATABASEURL || 'mongodb://localhost:27017/altBalajiTest',
    },

    'test': {
        "database": process.env.DATABASEURLTEST || 'mongodb://localhost:27017/altBalajiUnitTest',
    },

    'production': {
        'database': process.env.DATABASEURL || 'mongodb://localhost:27017/api_status',
    }
}