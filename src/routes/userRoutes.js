const router = require('express').Router();
const ctrl = require('../controllers/userController');
const { validateUser } = require('../middleware/validate');

router.get('/:id/workouts', ctrl.getUserWorkouts);
router.post('/', validateUser, ctrl.createUser);
router.get('/', ctrl.getAllUsers);
router.get('/:id', ctrl.getUserById);
router.put('/:id', ctrl.updateUser);
router.delete('/:id', ctrl.deleteUser);

module.exports = router;