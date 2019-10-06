const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/customers');

/*---------- Public Routes ----------*/
router.post('/signup', customersCtrl.signup);



/*---------- Protected Routes ----------*/




module.exports = router;