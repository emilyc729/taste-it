const Customer = require('../models/customer');

module.exports = {
  signup
};

async function signup(req, res) {
  const customer = new Customer(req.body);
  try {
    await customer.save();
    // TODO: Send back a JWT instead of the customer
    res.json(customer);
  } catch (err) {
    // Probably a duplicate email
    res.status(400).json(err);
  }
}