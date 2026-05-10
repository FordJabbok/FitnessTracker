const {
  Workout,
  User,
  Exercise,
  WorkoutExercise,
} = require('../models');

exports.createWorkout = async (req, res, next) => {
    try{
        const user = await User.findByPk(req.body.userId);
        if (!user){
            return res.status(404).json({
                error: 'User not found',
            });
        }
        const workout = await Workout.create(req.body);
        res.status(201).json(workout);
    } catch (err) {
        next(err);
    }
};

exports.getAllWorkouts = async (req, res, next) => {
  try {
    const workouts = await Workout.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });
    res.status(200).json(workouts);
  } catch (err) {
    next(err);
  }
};


exports.getWorkoutById = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name', 'email'],
        },
        {
          model: Exercise,
          as: 'exercises',
          through: {
            attributes: ['sets', 'reps', 'weight'],
          },
        },
      ],
    });
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
};


exports.updateWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }
    await workout.update(req.body);
    res.status(200).json(workout);
  } catch (err) {
    next(err);
  }
};


exports.deleteWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }
    await workout.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.addExerciseToWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id);
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }
    const exercise = await Exercise.findByPk(req.body.exerciseId);
    if (!exercise) {
      return res.status(404).json({
        error: 'Exercise not found',
      });
    }
    const { sets, reps, weight } = req.body;
    const [entry, created] = await WorkoutExercise.findOrCreate({
      where: {
        workoutId: workout.id,
        exerciseId: exercise.id,
      },
      defaults: {
        sets: sets || 1,
        reps: reps || 1,
        weight: weight ?? null,
      },
    });
    if (!created) {
      return res.status(409).json({
        error: 'Exercise already in this workout',
      });
    }
    res.status(201).json(entry);
  } catch (err) {
    next(err);
  }
};


exports.removeExerciseFromWorkout = async (req, res, next) => {
  try {
    const entry = await WorkoutExercise.findOne({
      where: {
        workoutId: req.params.id,
        exerciseId: req.params.exerciseId,
      },
    });
    if (!entry) {
      return res.status(404).json({
        error: 'Exercise not in this workout',
      });
    }
    await entry.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};


exports.getExercisesInWorkout = async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(req.params.id, {
      include: [
        {
          model: Exercise,
          as: 'exercises',
          through: {
            attributes: ['sets', 'reps', 'weight'],
          },
        },
      ],
    });
    if (!workout) {
      return res.status(404).json({
        error: 'Workout not found',
      });
    }
    res.status(200).json(workout.exercises);
  } catch (err) {
    next(err);
  }
};