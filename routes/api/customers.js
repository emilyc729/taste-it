const express = require('express');
const router = express.Router();
const customerCtrl = require('../../controllers/customers');

/*---------- Public Routes ----------*/
router.post('/signup', customerCtrl.signup);
router.post('/login', customerCtrl.login);



module.exports = router;