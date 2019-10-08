const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/orders');


router.use(require('../../config/auth'));
router.get('/', ordersCtrl.index);
router.post('/', ordersCtrl.create);
router.delete('/:id', ordersCtrl.delete);

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}

module.exports = router;