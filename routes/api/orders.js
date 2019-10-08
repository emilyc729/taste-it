const express = require('express');
const router = express.Router();
const ordersCtrl = require('../../controllers/orders');



router.use(require('../../config/auth'));
router.post('/', ordersCtrl.create);

module.exports = router;