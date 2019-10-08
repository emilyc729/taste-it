const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/orders');


router.use(require('../../config/auth'));
router.get('/', ordersCtrl.index);
router.post('/', ordersCtrl.create);
router.delete('/:id', ordersCtrl.delete);

module.exports = router;