require('dotenv').config();

module.exports = {
    'secret': 'authentication',
    'development': {
        'database': process.env.DATABASEURL || 'mongodb://localhost:27017/api_status',
    },

    'test': {
        "database": process.env.DATABASEURL || 'mongodb://localhost:27017/api_status',
    },

    'production': {
        'database': process.env.DATABASEURL || 'mongodb://localhost:27017/api_status',
    }
}