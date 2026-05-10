const router = require('express').Router();
const ctrl = require('../controllers/workoutController');
const { validateWorkout } = require('../middleware/validate');

router.post('/:id/exercises', ctrl.addExerciseToWorkout);
router.delete('/:id/exercises/:exerciseId', ctrl.removeExerciseFromWorkout);
router.get('/:id/exercises', ctrl.getExercisesInWorkout);
router.post('/', validateWorkout, ctrl.createWorkout);
router.get('/', ctrl.getAllWorkouts);
router.get('/:id', ctrl.getWorkoutById);
router.put('/:id', ctrl.updateWorkout);
router.delete('/:id', ctrl.deleteWorkout);


module.exports = router;