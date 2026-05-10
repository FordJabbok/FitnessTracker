const { User, Workout } = require('../models');
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Workout,
          as: 'workouts',
        },
      ],
    });
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    await user.update(req.body);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

exports.getUserWorkouts = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id, {
      include: [
        {
          model: Workout,
          as: 'workouts',
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        error: 'User not found',
      });
    }
    res.status(200).json(user.workouts);
  } catch (err) {
    next(err);
  }
};