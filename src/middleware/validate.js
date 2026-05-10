const validateUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const errors = [];
  if (!name || name.trim() === '') {
    errors.push('name is required');
  }
  if (!email || email.trim() === '') {
    errors.push('email is required');
  }
  if (email && !/\S+@\S+\.\S+/.test(email)) {
    errors.push('email must be valid');
  }
  if (!password || password.length < 6) {
    errors.push('password must be at least 6 characters');
  }
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
  }
  next();
};


const validateWorkout = (req, res, next) => {
  const { title, date, userId } = req.body;
  const errors = [];
  if (!title || title.trim() === '') {
    errors.push('title is required');
  }
  if (!date) {
    errors.push('date is required');
  }
  if (!userId) {
    errors.push('userId is required');
  }
  if (date && isNaN(Date.parse(date))) {
    errors.push('date must be a valid date');
  }
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
  }
  next();
};


const validateExercise = (req, res, next) => {
  const { name, category } = req.body;
  const errors = [];
  const validCategories = [
    'strength',
    'cardio',
    'flexibility',
  ];
  if (!name || name.trim() === '') {
    errors.push('name is required');
  }
  if (!category) {
    errors.push('category is required');
  }
  if (category && !validCategories.includes(category)) {
    errors.push('category must be strength, cardio, or flexibility');
  }
  if (errors.length > 0) {
    return res.status(400).json({
      error: 'Validation failed',
      details: errors,
    });
  }
  next();
};


module.exports = {
  validateUser,
  validateWorkout,
  validateExercise,
};