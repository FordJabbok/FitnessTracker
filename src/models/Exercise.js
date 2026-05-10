const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Exercise = sequelize.define('Exercise', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: {
            msg: 'Exercise name alreaddy exist',        
    },
    validate: {
        notEmpty: true,
    },
    },
    category: {
        type: DataTypes.ENUM(
            'strength',
            'cardio',
            'flexibility'
        ),
        allowNull: false,
        validate: {
            isIn: {
                args: [['strength', 'cardio', 'flexibility']],
                msg: 'Category mus be strength, cardio, or flexibility',
            },
        },
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
});

module.exports = Exercise;