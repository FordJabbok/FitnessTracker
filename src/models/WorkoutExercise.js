const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const WorkoutExercise = sequelize.define('WorkoutExercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: {
        args: [1],
        msg: 'Sets must be at least 1',
      },
    },
  },

  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: {
        args: [1],
        msg: 'Reps must be at least 1',
      },
    },
  },
  weight: {
    type: DataTypes.FLOAT,
    allowNull: true,
    validate: {
      min: {
        args: [0],
        msg: 'Weight cannot be negative',
      },
    },
  },
});

module.exports = WorkoutExercise;