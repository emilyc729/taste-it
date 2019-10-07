const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

async function signup(req, res) {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    const token = createJWT(customer);
    res.json({token});
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);

  }
}

function createJWT(customer) {
  return jwt.sign(
    {customer},
    SECRET,
    {expiresIn: '24h'}
  );
}

async function login(req, res) {
  try {
    const customer = await Customer.findOne({email: req.body.email});
    if (!customer) return res.status(401).json({err: 'bad credentials'});
    customer.comparePassword(req.body.pw, (err, isMatch) => {
      if (isMatch) {
        const token = createJWT(customer);
        res.json({token});
      } else {
        return res.status(401).json({err: 'bad credentials'});
      }
    });
  } catch (err) {
    return res.status(401).json(err);
  }
}

module.exports = {
  signup,
  login
};