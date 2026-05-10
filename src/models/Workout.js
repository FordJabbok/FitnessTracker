const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Workout = sequelize.define('Workout',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Title cannot be empty',
            },
        },
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
            isDate: {
                msg: 'Must be calid date',
            },
        },
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}
);
module.exports = Workout;