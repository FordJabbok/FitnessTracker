const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Name cannot  be empty',
            },
        len: {
            args: [2,100],
            msg: 'Name must be 2-100 characters',
        },
        },
    },
    email: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: {
            msg: 'Email already in use',
        },
        validate: {
            isEmail: {
                msg: 'Must be a valid email address',
            },
            notEmpty: true,
        },
    },
    password: {
        type: DataTypes.STRING(225),
        allowNull: false,
        validate: {
            len: {
                args: [6,225],
                msg: 'Password must be at least 6 characters',
            },
        },
    },
});

module.exports = User;