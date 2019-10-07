const express = require('express');
const router = express.Router();
const customersCtrl = require('../../controllers/customers');

/*---------- Public Routes ----------*/
router.post('/signup', customersCtrl.signup);
router.post('/login', customersCtrl.login);



/*---------- Protected Routes ----------*/
router.use(require('../../config/auth'));

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}


module.exports = router;