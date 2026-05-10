const sequelize = require('../config/database');
const User = require('./User');
const Workout = require('./Workout');
const Exercise = require('./Exercise');
const WorkoutExercise = require('./WorkoutExercise');

User.hasMany(Workout, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    onDelete: 'CASCADE',
    as: 'workouts',
});

Workout.belongsTo(User, {
    foreignKey: {
        name: 'userId',
        allowNull: false,
    },
    as: 'user',
});

Workout.belongsToMany(Exercise, {
    through: WorkoutExercise,
    foreignKey: 'workoutId',
    otherKey: 'exerciseId',
    as: 'exercises',
});

Exercise.belongsToMany(Workout, {
  through: WorkoutExercise,
  foreignKey: 'exerciseId',
  otherKey: 'workoutId',
  as: 'workouts',
});

module.exports = {
    sequelize,
    User,
    Workout,
    Exercise,
    WorkoutExercise
};