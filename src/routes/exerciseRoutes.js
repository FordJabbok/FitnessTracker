const router = require('express').Router();
const ctrl = require('../controllers/exerciseController');
const { validateExercise } = require('../middleware/validate');

router.post('/', validateExercise, ctrl.createExercise);
router.get('/', ctrl.getAllExercises);
router.get('/:id', ctrl.getExerciseById);
router.put('/:id', ctrl.updateExercise);
router.delete('/:id', ctrl.deleteExercise);
module.exports = router;