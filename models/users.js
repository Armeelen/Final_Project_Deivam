const { DataTypes } = require('sequelize');
const db = require('../database');// database connection object

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        unique: true
    },
    password: DataTypes.STRING,
    type: {
        type: DataTypes.STRING,
        defaultValue: 'user'
    },
});

db.sync()
.then(() => {
    console.log('User table created if not already exists.');
})
.catch((error) => {
    console.error('Error creating table:', error);
});


module.exports = User;