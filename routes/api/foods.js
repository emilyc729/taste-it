const express = require('express');
const router = express.Router();
const foodsCtrl = require('../../controllers/foods');


router.use(require('../../config/auth'));
router.post('/:id/foods', foodsCtrl.createFood);
router.delete('foods/:id', foodsCtrl.deleteFood);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;