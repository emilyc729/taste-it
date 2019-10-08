const Customer = require('../models/customer');

module.exports = {
   create
  };

async function create(req, res) {
    console.log(req.user);
    const customer = await Customer.findById(req.user._id);
    customer.orders.push(req.body);
    const saveCustomer = await customer.save();
    return res.json(saveCustomer);
  }