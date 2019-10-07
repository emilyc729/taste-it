const express = require('express');
const router = express.Router();
const customerCtrl = require('../../controllers/customers');

/*---------- Public Routes ----------*/
router.post('/signup', customerCtrl.signup);
router.post('/login', customerCtrl.login);



/*---------- Protected Routes ----------*/
//router.use(require('../../config/auth'));

/*----- Helper Functions -----*/
function checkAuth(req, res, next) {
    if (req.user) return next();
    return res.status(401).json({ msg: 'Not Authorized' });
}


module.exports = router;