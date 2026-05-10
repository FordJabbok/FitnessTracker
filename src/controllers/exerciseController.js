const { Exercise } = require('../models');
exports.createExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.create(req.body);
    res.status(201).json(exercise);
  } catch (err) {
    next(err);
  }
};

exports.getAllExercises = async (req, res, next) => {
  try {
    const exercises = await Exercise.findAll();
    res.status(200).json(exercises);
  } catch (err) {
    next(err);
  }
};

exports.getExerciseById = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({
        error: 'Exercise not found',
      });
    }
    res.status(200).json(exercise);
  } catch (err) {
    next(err);
  }
};

exports.updateExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({
        error: 'Exercise not found',
      });
    }
    await exercise.update(req.body);
    res.status(200).json(exercise);
  } catch (err) {
    next(err);
  }
};

exports.deleteExercise = async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(req.params.id);
    if (!exercise) {
      return res.status(404).json({
        error: 'Exercise not found',
      });
    }
    await exercise.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};