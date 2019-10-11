const express = require('express');
const router = express.Router();
const foodsCtrl = require('../../controllers/foods');


router.use(require('../../config/auth'));
router.get('/:id/foods', checkAuth, foodsCtrl.getAllFoods);
router.post('/:id/foods', checkAuth, foodsCtrl.createFood);
router.put('/foods/:id', checkAuth, foodsCtrl.updateFood);
router.delete('/foods/:id', checkAuth, foodsCtrl.deleteFood);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;