const Customer = require('../models/customer');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

module.exports = {
  signup
};

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